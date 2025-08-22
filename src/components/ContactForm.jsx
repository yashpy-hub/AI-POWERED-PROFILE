
import React from 'react';
import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.jsx';
import { Toaster, toast } from 'sonner';

// TODO: Replace with your EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_ulroztr';
const EMAILJS_TEMPLATE_ID = 'template_1r9wyym';
const EMAILJS_PUBLIC_KEY = 'Ghzb7FbKl2QdBXLi8';

const formSchema = z.object({
  user_name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  user_email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export function ContactForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_name: '',
      user_email: '',
      message: '',
    },
  });

  const sendEmail = (data) => {
    const templateParams = {
      user_name: data.user_name,
      user_email: data.user_email,
      message: data.message,
    };

    toast.promise(
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY),
      {
        loading: 'Sending message...',
        success: () => {
          form.reset();
          return 'Message sent successfully!';
        },
        error: (err) => {
          console.error('FAILED...', err);
          return 'Failed to send message. Please try again later.';
        },
      }
    );
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-md">
      <Toaster position="top-center" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(sendEmail)} className="space-y-4">
          <FormField
            control={form.control}
            name="user_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="user_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Your Message" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </Form>
    </div>
  );
}
