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

//next router
import { GlobalContext } from "components/contexts/GlobalContextProvider";
import { ApiRoutes } from "lib/constants";
import { signIn } from "lib/cookie";
import { APIPusher } from "lib/services";
import { useRouter } from "next/router";

//recoil
import { tokenDetailsCookieAtom } from "components/recoil";
import { useSetRecoilState } from "recoil";

function SignInForm() {
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
  } = useForm<IZodSignInType>({
    resolver: zodResolver(zodSignInValidation),
  });

  const onSubmit = async (payload: IZodSignInType) => {
    try {
      const userTokenDetails = await APIPusher(ApiRoutes.USER_SIGNIN, payload);

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
        <h1 className="text-3xl font-bold text-center">Welcome Back!</h1>
        <p className="text-gray-700 font-medium dark:text-gray-400">
          We're so excited to see you again!
        </p>
      </header>

      <form className="p-4 w-full sm:max-w-lg space-y-4">
        <Form.Group>
          <Form.Label isRequired>Email</Form.Label>
          <Form.Input errors={errors} register={register} name="email" />
        </Form.Group>

        <Form.Group>
          <Form.Label isRequired>Password</Form.Label>
          <Form.Input
            errors={errors}
            type="password"
            register={register}
            name="password"
          />
          <Link
            href="/forgot-password"
            className="text-blue-500 hover:underline text-sm mt-2"
          >
            Forgot your password?
          </Link>
        </Form.Group>

        <DotLoaderButton
          disabled={isSubmitting || isSubmitSuccessful}
          onClick={handleSubmit(onSubmit)}
          className="w-full"
        >
          Sign In
        </DotLoaderButton>
      </form>

      <footer>
        <p>
          Need an account?{" "}
          <Link href={"/signup"} className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </footer>
    </div>
  );
}

export default SignInForm;

type IZodSignInType = zod.infer<typeof zodSignInValidation>;

export const zodSignInValidation = zod.object({
  email: zod
    .string({
      required_error: "*This field is required. Please enter a valid value",
    })
    .min(1, "*This field is required. Please enter a valid value")
    .email()
    .trim(),
  password: zod
    .string({
      required_error: "*This field is required. Please enter a valid value",
    })
    .min(8, "The password length can't be less than 8."),
});
