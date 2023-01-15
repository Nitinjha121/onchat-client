import React from "react";

//react hook form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

//zod
import zod from "zod";

//ui components
import { DotLoaderButton, Form } from "components/ui";

//next link
import Link from "next/link";

//services
import { ApiRoutes } from "lib/constants";
import { APIPusher } from "lib/services";

//context
import { GlobalContext } from "components/contexts/GlobalContextProvider";

//next router
import { useRouter } from "next/router";

//cookie
import { signIn } from "lib/cookie";

//recoil
import { tokenDetailsCookieAtom } from "components/recoil";
import { useSetRecoilState } from "recoil";

function SignUpForm() {
  //context
  const { globalDispatch } = React.useContext(GlobalContext);

  //router
  const router = useRouter();

  //recoil state
  const setTokenDetails = useSetRecoilState(tokenDetailsCookieAtom);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<IZodSignUpType>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(zodSignUpValidation),
  });

  const onSubmit = async (payload: IZodSignUpType) => {
    try {
      const userTokenDetails = await APIPusher(ApiRoutes.USER_SIGNUP, payload);

      setTokenDetails(userTokenDetails);
      signIn(userTokenDetails);
      router.push("/channels/@me");
    } catch (err: any) {
      globalDispatch({
        type: "ADD_TOAST_ALERT",
        payload: {
          kind: "warning",
          description: err?.data?.message || "Something Went Wrong.",
          heading: "warning",
        },
      });
      throw err;
    }
  };

  return (
    <div className="flex flex-col py-8 items-center h-full">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-center">Create an Account</h1>
      </header>

      <section className="p-4 w-full sm:max-w-lg space-y-4">
        <Form.Group>
          <Form.Label isRequired>Name</Form.Label>
          <Form.Input errors={errors} register={register} name="name" />
        </Form.Group>

        <Form.Group>
          <Form.Label isRequired>Email</Form.Label>
          <Form.Input errors={errors} register={register} name="email" />
        </Form.Group>

        <Form.Group>
          <Form.Label isRequired>UserName</Form.Label>
          <Form.Input errors={errors} register={register} name="username" />
        </Form.Group>

        <Form.Group>
          <Form.Label isRequired>Password</Form.Label>
          <Form.Input
            errors={errors}
            type="password"
            register={register}
            name="password"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label isRequired>Date Of Birth</Form.Label>
          <Form.Input
            errors={errors}
            type="date"
            register={register}
            name="dateOfBirth"
          />
        </Form.Group>

        <DotLoaderButton
          disabled={isSubmitting || isSubmitSuccessful}
          onClick={handleSubmit(onSubmit)}
          className="w-full"
        >
          Sign Up
        </DotLoaderButton>
      </section>

      <footer>
        <Link href={"/signin"} className="text-blue-500 hover:underline">
          Already have an account?
        </Link>
      </footer>
    </div>
  );
}

export default SignUpForm;

type IZodSignUpType = zod.infer<typeof zodSignUpValidation>;

export const zodSignUpValidation = zod.object({
  name: zod
    .string({
      required_error: "*This field is required. Please enter a valid value",
    })
    .trim()
    .min(1, "*This field is required. Please enter a valid value"),
  email: zod
    .string({
      required_error: "*This field is required. Please enter a valid value",
    })
    .email(),
  username: zod
    .string({
      required_error: "*This field is required. Please enter a valid value",
    })
    .trim()
    .min(1, "*This field is required. Please enter a valid value"),
  password: zod
    .string({
      required_error: "*This field is required. Please enter a valid value",
    })
    .min(8, "The password length can't be less than 8."),
  dateOfBirth: zod
    .string({
      required_error: "*This field is required. Please enter a valid value",
    })
    .min(1, "*This field is required. Please enter a valid date"),
});
