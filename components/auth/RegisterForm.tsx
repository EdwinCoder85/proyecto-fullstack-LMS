"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas/authSchema";
import { RiGoogleFill, RiFacebookFill, RiGithubFill } from "react-icons/ri";
import { Button, Input, Label } from "@/components/ui";
import Link from "next/link";
import { ButtonSignIn } from "@/components/ui";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  image: string;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>( {
    resolver: zodResolver( registerSchema ),
    defaultValues: {
      role: "user",
    },
  } );

  const router = useRouter();
  const [ file, setFile ] = useState<File | undefined>();
  const [ selectedFile, setSelectedFile ] = useState<string>(
    "Seleccionar archivo"
  );

  const onSubmit: SubmitHandler<FormData> = async ( data ) => {
    try {
      if ( data.password !== data.confirmPassword ) {
        return alert( "Passwords do not match" );
      }

      if ( file ) {
        const formData = new FormData();
        formData.append( "file", file );
        const result = await fetch( "/api/upload", {
          method: "POST",
          body: formData,
        } );
        const uploadData = await result.json();
        data.image = uploadData.secure_url;
      }

      const res = await fetch( "/api/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      } );

      if ( res.ok ) {
        router.push( "/auth/login" );
      }
    } catch ( error ) {
      console.error( error );
    }
  };

  const handleFileInputChange = ( e: ChangeEvent<HTMLInputElement> ) => {
    const file = e.target.files?.[ 0 ];
    if ( file ) {
      setSelectedFile( file.name );
      setFile( e.target.files?.[ 0 ] );
    } else {
      setSelectedFile( "Seleccionar archivo" );
    }
  };

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Register</h2>
        <p className="text-gray-500 text-sm">
          Please enter your email and password to enter the application
        </p>
      </div>
      <form className="w-full" onSubmit={ handleSubmit( onSubmit ) }>
        <div className="flex flex-row gap-x-4">
          <div className="w-96">
            <div className="flex flex-col my-2">
              <Input
                type="text"
                placeholder="Username"
                { ...register( "username" ) }
              />
              { errors.username && (
                <span className="text-red-500 text-xs">
                  { errors.username.message }
                </span>
              ) }
            </div>
            <div className="flex flex-col my-2">
              <Input type="text" placeholder="Email" { ...register( "email" ) } />
              { errors.email && (
                <span className="text-red-500 text-xs">
                  { errors.email.message }
                </span>
              ) }
            </div>
            <div className="flex flex-col my-2">
              <Input
                type="password"
                placeholder="Password"
                { ...register( "password" ) }
              />
              { errors.password && (
                <span className="text-red-500 text-xs">
                  { errors.password.message }
                </span>
              ) }
            </div>
            <div className="flex flex-col my-2">
              <Input
                type="password"
                placeholder="Confirm password"
                { ...register( "confirmPassword" ) }
              />
              { errors.confirmPassword && (
                <span className="text-red-500 text-xs">
                  { errors.confirmPassword.message }
                </span>
              ) }
            </div>
            <div className="flex justify-evenly my-2 mb-4">
              <div className="flex place-content-center gap-x-2">
                <Input
                  { ...register( "role" ) }
                  type="radio"
                  value="admin"
                  className="w-6 h-6 border ring-0 border-gray-200 text-blue-600 disabled:text-gray-300 outline-none focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <Label>Admin</Label>
              </div>
              <div className="flex place-content-center gap-x-2">
                <Input
                  { ...register( "role" ) }
                  type="radio"
                  value="user"
                  className="w-6 h-6 border ring-0 border-gray-200 text-blue-600 disabled:text-gray-300 outline-none focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <Label>User</Label>
              </div>
            </div>
            { errors.role && (
              <span className="text-red-500 text-xs">
                { errors.role.message }
              </span>
            ) }
          </div>
          <div className="w-96">
            <Input
              type="file"
              { ...register( "image", {
                required: true,
                onChange: handleFileInputChange,
              } ) }
            />
            <div className="flex gap-x-4">
              { errors.image ? (
                <span className="text-red-500 text-xs">
                  { errors.image.message }
                </span>
              ) : (
                <span
                  className="mt-1 text-sm text-primary dark:text-gray-900"
                  id="imageUrl_error"
                >
                  JPG, JPGE, PNG o WEBP (10MB Max).
                </span>
              ) }
            </div>
            <div className="bg-gray-100 rounded-xl p-4 my-4 h-60">
              { file && (
                <Image
                  src={ URL.createObjectURL( file ) }
                  alt="Uploaded file"
                  className="w-80 h-40 object-cover mx-auto"
                  width={ 100 }
                  height={ 100 }
                />
              ) }
              { selectedFile === "Seleccionar archivo" ? (
                <label
                  htmlFor="photo"
                  className="block mr-4 py-2 px-4
            rounded-md border-0 text-sm font-semibold bg-secondInk
            text-slate-700 hover:bg-secondInk-700 text-center transition-colors"
                >
                  Seleccionar archivos
                </label>
              ) : (
                <label
                  htmlFor="photo"
                  className="block mr-4 py-2 px-4
            rounded-md border-0 text-sm font-semibold bg-thirdInk-300
            text-secondInk hover:bg-thirdInk-700 text-center transition-colors"
                >
                  { selectedFile }
                </label>
              ) }
            </div>
          </div>
        </div>
        <Button type="submit" className="block mt-2" disabled={ isSubmitting }>
          { isSubmitting ? "Enviando..." : "Create account" }
        </Button>
        <div className="mt-5 mb-10 flex items-center justify-center gap-x-2">
          <p className="text-gray-500">have account?</p>
          <Link
            href="/auth/login"
            className="font-semibold hover:text-primary-600 transition-colors duration-300"
          >
            Login
          </Link>
        </div>
        <div className="mb-5">
          <hr className="border-2" />
          <div className="flex justify-center">
            <span className="bg-white px-8 -mt-3">or</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <ButtonSignIn icon={ RiGoogleFill } provider="google">
            Google
          </ButtonSignIn>
          <ButtonSignIn icon={ RiFacebookFill } provider="facebook">
            Facebook
          </ButtonSignIn>
          <ButtonSignIn icon={ RiGithubFill } provider="github">
            Github
          </ButtonSignIn>
        </div>
      </form>
    </div>
  );
}
