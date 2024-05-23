import React, { useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const SearchCity = ({ onSearch }) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });

  const onSubmit = (data) => {
    onSearch(data.city);
  };

  useEffect(() => {
    let clearErrorTimeout;
    if (errors.city) {
      clearErrorTimeout = setTimeout(() => {
        clearErrors("city");
      }, 2000);
    }
    return () => clearTimeout(clearErrorTimeout);
  }, [errors.city, clearErrors]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mt-5 md:absolute md:w-[400px] flex flex-col justify-center md:left-[550px]"
    >
      <div className="flex w-full justify-center md:left-[550px]">
        <input
          type="text"
          {...register("city", {
            required: "Nazwa miasta jest wymagana!",
          })}
          className="rounded-full py-3 px-10 bg-transparent placeholder:text-white text-white border-2 select-none focus:outline-none border-white"
          placeholder="Wyszukaj miasto..."
        />
        <button className=" py-[12px] px-3 rounded-e-full absolute translate-x-[105px] ">
          <IoMdSearch size={25} className="text-white" />
        </button>
      </div>

      <ErrorMessage
        errors={errors}
        name="city"
        render={({ message }) => (
          <p className="flex w-full justify-center text-red-500 md:left-[550px] mt-2 text-l font-[700]">
            {message}
          </p>
        )}
      />
    </form>
  );
};

export default SearchCity;
