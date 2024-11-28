"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import trash from "@/public/trash.svg";
import search from "@/public/search.svg";

export default function MenuForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (formData) => {
    const menu = {
      id: Math.random(),
      ...formData,
    };
    console.log(menu);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 my-6 mx-4 bg-bgPrimary border border-borderPrimary rounded-lg"
    >
      <div className="flex flex-wrap items-start">
        <div className="flex-auto">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-textSecondary mb-2"
            >
              Nazwa
            </label>
            <input
              id="name"
              {...register("text", {
                required: "To pole jest wymagane",
                minLength: {
                  value: 3,
                  message: "Tekst musi mieć co najmniej 3 znaki",
                },
              })}
              placeholder="np. Promocje"
              className="w-full py-2 px-3 border border-borderPrimary rounded-lg focus:outline-none focus:ring-2 focus:ring-buttonPrimaryBg"
            />
            {errors.text && (
              <p className="text-sm text-red-600 mt-1">{errors.text.message}</p>
            )}
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="link"
              className="block text-sm font-medium text-textSecondary mb-2"
            >
              Link
            </label>
            <Image
              src={search}
              alt="Usuń menu"
              className="absolute left-3 top-12 transform -translate-y-1/2 w-5 h-5"
            />
            <input
              id="link"
              {...register("link", {
                required: "To pole jest wymagane",
                pattern: {
                  value:
                    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:[0-9]{1,5})?(\/.*)?$/i,
                  message: "Proszę wpisać prawidłowy adres URL",
                },
              })}
              placeholder="Wklej lub wyszukaj"
              className="w-full pl-10 py-2 pr-3 border border-borderPrimary rounded-lg"
            />
            {errors.link && (
              <p className="text-sm text-red-600 mt-1">{errors.link.message}</p>
            )}
          </div>

          <div className="flex flex-wrap justify-left gap-y-2.5 gap-x-3.5">
            <button
              type="button"
              onClick={() => reset()}
              className="px-4 py-2 text-sm font-medium text-textSecondary bg-white border border-buttonSecondaryBorder rounded-lg hover:bg-gray-100"
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-buttonSecondaryColorText border border-buttonSecondaryColorBorder rounded-lg hover:bg-purple-100"
            >
              Dodaj
            </button>
          </div>
        </div>
        <Link href="/">
          <Image src={trash} alt="Usuń menu" className="m-2 cursor-pointer" />
        </Link>
      </div>
    </form>
  );
}
