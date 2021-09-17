import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import mime from "mime-types";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Image } from "react-bootstrap";
import defaultAvatar from "../../assets/images/user.png";

function RegisterPage(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });
  const dispatch = useDispatch();
  const history = useHistory();

  const initialValues = { name: "", statusMessage: "", profileImage: {} };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState();
  const [preview, setPreview] = useState();
  const [loading, setLoading] = useState(false);

  const inputOpenImageRef = useRef();

  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  };

  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    const metadata = { contentType: mime.lookup(file.name) };

    console.log("file: ", file);
    console.log("metadata: ", metadata);

    // preview
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setPreview(e.target.result);
      console.log("fileReader: ", e.target.result);
    };

    setFormValues({
      ...formValues,
      // profileImage: { file: file, metadata: metadata },
      profileImage: file,
    });
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      setFormValues({
        ...formValues,
        name: data.name,
        statusMessage: data.statusMessage,
      });
      const formData = new FormData();
      formData.append("name", formValues.name);
      formData.append("statusMessage", formValues.statusMessage);
      formData.append("image", formValues.profileImage);
      const config = {
        headers: { "contents-type": "multipart/form-data" },
      };
      axios
        .post("", formData, config) // api 작성
        .then((response) => {
          console.log("response", response);
          // dispatch
          history.push(`${props.root}/`);
        })
        .catch(function (error) {
          alert(`회원 정보 등록 실패
        ${error}`);
        });
      setLoading(false);
    } catch (error) {
      setFormErrors(error.message);
      setLoading(false);
      console.log("error", error.message);
      setTimeout(() => {
        setFormErrors("");
      }, 5000);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        backgroundImage: "linear-gradient(70deg, #3A9995, #C4EBE8)",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 200,
          color: "#fff",
          textShadow: "1px 1px 1px #3A9995",
          marginBottom: 30,
        }}
      >
        프로필 정보
      </h1>
      <form
        className="registerForm"
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: 240, display: "flex", flexDirection: "column", color: "#fff" }}
      >
        <p className="warningMessage" style={{ textAlign: "right" }}>
          * 필수 입력
        </p>

        <div
          style={{
            margin: "10px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Image
            src={preview ?? defaultAvatar}
            width={100}
            roundedCircle
            style={{ backgroundColor: "#fff", border: "2px solid skyblue" }}
          />
          <input
            type="file"
            name="image"
            accept="image/jpeg, image/png"
            ref={inputOpenImageRef}
            onChange={handleUploadImage}
            style={{ display: "none" }}
          />
          <input
            type="button"
            value="변경"
            onClick={() => {
              handleOpenImageRef();
            }}
            style={{
              marginTop: 20,
              height: 30,
              borderRadius: 20,
              padding: "0 10px",
              backgroundColor: "#C4EBE8",
              fontSize: 12,
              color: "#3A9995",
              border: "1px solid #3A9995",
              boxShadow: "1px 1px 1px #3A9995",
            }}
          />
        </div>

        <label for="name">
          이름<span className="warningMessage">*</span>
        </label>
        <input
          type="text"
          name="name"
          {...register("name", { required: true, minLength: 2, maxLength: 8 })}
          style={{ border: "1px solid #3A9995", boxShadow: "1px 1px 1px #3A9995" }}
        />
        {errors.name && errors.name.type === "required" && (
          <p className="warningMessage"> 필수 입력 사항입니다.</p>
        )}
        {errors.name && (errors.name.type === "minLength" || errors.name.type === "maxLength") && (
          <p className="warningMessage"> 입력 길이를 다시 확인해주세요. (2-8글자)</p>
        )}

        <label for="statusMessage">상태메시지</label>
        <input
          type="text"
          name="statusMessage"
          {...register("statusMessage", { required: false, maxLength: 20 })}
          style={{ border: "1px solid #3A9995", boxShadow: "1px 1px 1px #3A9995" }}
        />
        {errors.statusMessage && errors.statusMessage.type === "maxLength" && (
          <p className="warningMessage">
            최대 입력 길이를 초과하였습니다.
            <br /> (최대 20글자)
          </p>
        )}

        {formErrors && <p className="warningMessage"> {formErrors}</p>}
        <input
          type="submit"
          value="확인"
          disabled={loading}
          style={{
            marginTop: 30,
            height: 40,
            backgroundColor: "#C4EBE8",
            color: "#3A9995",
            border: "1px solid #3A9995",
            boxShadow: "1px 1px 1px #3A9995",
          }}
        />
      </form>
    </div>
  );
}

export default RegisterPage;
