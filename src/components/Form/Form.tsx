import { useState, useEffect, useRef } from "react";

import { Checkbox, Button, Box, FormControlLabel } from "@mui/material/";
import Grid from "@mui/material/Unstable_Grid2";

import {
  useForm,
  SubmitHandler,
  Controller,
  useFormState,
} from "react-hook-form";

import axios from "axios";

import { IForm } from "./interfaces/Form";

import Input from "../Input/Input";
import SelectComp from "../Select/Select";
import DateTimePick from "../DateTimePicker/DateTimePicker";

import { GET_USERS, CREATE_EVENT } from "../../constants/api.js";

import {
  eventNameValidation,
  datePickerValidation,
} from "../../validators/validators.ts";

import styles from "./Form.module.scss";

function toIsoLocalTime(value) {
  if (value instanceof Date === false) value = new Date();
  const off = value.getTimezoneOffset() * -1;
  const del = value.getMilliseconds() ? "Z" : ".";
  value = new Date(value.getTime() + off * 60000);
  return (
    value.toISOString().split(del)[0] +
    (off < 0 ? "-" : "+") +
    ("0" + Math.abs(Math.floor(off / 60))).substr(-2) +
    ":" +
    ("0" + Math.abs(off % 60)).substr(-2)
  );
}

export const Form: React.FC = () => {
  const { handleSubmit, control, setValue } = useForm<IForm>({
    mode: "onChange",
  });
  const { errors } = useFormState({
    control,
  });

  const [checked, setChecked] = useState(false);
  const [users, setUsers] = useState([]);

  const eventId = useRef();

  // const params = new URL(location.href).searchParams;
  // if (params.size > 0) {
  //   eventId.current = parseInt(params.get("id"));
  // }

  const optionsSelect = [
    {
      id: 0,
      title: "Другое",
    },
    {
      id: 1,
      title: "Курс",
    },
    {
      id: 2,
      title: "Адаптация",
    },
  ];

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    let arr: any = [];

    const response = axios.get(`${GET_USERS}`);

    const { data } = await response;

    arr.push(Object.values(data));

    setUsers(arr[0]);
  }

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    data.startDate
      ? (data.startDate = toIsoLocalTime(data?.startDate?.$d))
      : undefined;
    data.endDate
      ? (data.endDate = toIsoLocalTime(data?.endDate?.$d))
      : undefined;

    console.log(data);

    // if (!eventId.current) {
    const response = await axios.post(`${CREATE_EVENT}`, JSON.stringify(data));
    // } else if (eventId.current) {
    //   const response = await axios.put(
    //     `${CREATE_REPORT}${eventId.current}`,
    //     JSON.stringify(data)
    //   );
    // }

    //   let result = await response.json();
    //   alert(result.message);
  };

  function handleChangeCheckbox() {
    setChecked((prevState) => !prevState);
  }

  function setFormValues() {
    setValue("eventName", "123456");
  }

  return (
    <div className={styles["auth-form"]}>
      <form
        className={styles["auth-form__form"]}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container>
          <Grid md={12} xs={12}>
            <Controller
              control={control}
              name="eventName"
              rules={eventNameValidation}
              render={({ field }) => (
                <Input
                  label="Название события"
                  fullWidth={true}
                  field={field}
                  errors={errors}
                  fieldInput="eventName"
                />
              )}
            />
          </Grid>
          <Grid
            md={12}
            xs={12}
            sx={{
              marginTop: 2,
            }}
          >
            <Controller
              control={control}
              name="desc"
              render={({ field }) => (
                <Input
                  label="Краткое описание"
                  fullWidth={true}
                  field={{ value: field.value, onChange: field.onChange }}
                  errors={errors}
                  fieldInput="desc"
                />
              )}
            />
          </Grid>
          <Grid
            md={12}
            xs={12}
            sx={{
              marginTop: 2,
            }}
          >
            <Controller
              control={control}
              name="type"
              defaultValue={"Другое"}
              render={({ field }) => (
                <SelectComp
                  required={true}
                  multiple={false}
                  withCheckbox={false}
                  field={{ value: field.value, onChange: field.onChange }}
                  options={optionsSelect}
                />
              )}
            />
          </Grid>
          <Grid
            md={5}
            xs={12}
            sx={{
              marginTop: 2,
            }}
          >
            <Controller
              control={control}
              name="startDate"
              rules={datePickerValidation}
              render={({ field }) => (
                <DateTimePick
                  label="Время начала"
                  field={{ value: field.value, onChange: field.onChange }}
                  errors={errors}
                  fieldInput="startDate"
                />
              )}
            />
          </Grid>
          <Grid
            md={2}
            xs={12}
            sx={{
              marginTop: 3,
            }}
          >
            <FormControlLabel
              label="До"
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChangeCheckbox}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
            />
          </Grid>
          {checked && (
            <Grid
              md={5}
              xs={12}
              sx={{
                marginTop: 2,
              }}
            >
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <DateTimePick
                    label="Время окончания"
                    field={{ value: field.value, onChange: field.onChange }}
                    errors={errors}
                    fieldInput="endDate"
                  />
                )}
              />
            </Grid>
          )}
          <Grid
            md={12}
            xs={12}
            sx={{
              marginTop: 2,
            }}
          >
            <Controller
              control={control}
              name="users"
              defaultValue={[]}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <SelectComp
                    label="Пользователи"
                    multiple={true}
                    withCheckbox={true}
                    field={{ value: field.value, onChange: field.onChange }}
                    options={users}
                    required={true}
                  />
                );
              }}
            />
          </Grid>

          <Grid md={12} xs={12}>
            <Button
              type="submit"
              variant="contained"
              disableElevation={true}
              sx={{
                marginTop: 2,
              }}
            >
              Отправить
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Form;
