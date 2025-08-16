import {  z } from "zod"
import {zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  email: z.string().email({message: "Pleqase enter a valid email adress."}),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  })
})

const LoginForm = () => {
    const form = useForm({
    resolver: zodResolver(formSchema),
  });

    function onSubmit(values) {
    console.log(values);
  }

  return (
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-96">
        <div className="text-center">
            <h1 className="text-primary font-bold text-2xl mb-1">Login</h1>
            <p className="text-xs font-normal text-muted-foreground mb-4">Welcome back, please login to continue</p>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@examle.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default LoginForm