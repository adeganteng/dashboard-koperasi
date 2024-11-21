import { Button } from "@/components/ui/button";

import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { loginFormSchema } from "@/schema/login-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";

const LoginPage = () => {
  const { login, isLoggingIn, user } = useAuthStore();
  const navigate = useNavigate();

  const loginForm = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data) => {
    const response = await login(data);
    console.log(response);
    if (response) {
      navigate("/dashboard/main");
    } else {
      navigate("/login");
    }
  };

  // Pindahkan useEffect ke tingkat atas
  useEffect(() => {
    if (user) {
      navigate("/dashboard/main");
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />
      <div className="h-[80vh] flex items-center justify-center p-2">
        <div className="w-full sm:w-[400px] px-8 py-10 bg-secondary rounded-lg space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Login
          </h1>
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(handleLogin)}>
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Masukan Email..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Masukan Password..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={isLoggingIn}
                type="submit"
                className="w-full mt-6"
              >
                {isLoggingIn ? (
                  <LoaderCircle size={20} className="animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
