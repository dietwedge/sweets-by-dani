"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    // FabForm handles the actual submission, this is just for client-side feedback
    toast.success("Your message has been sent!");
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <section className="w-full max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-foreground">Contact Us</h2>
      <p className="text-center text-muted-foreground mb-8">
        Have a question or a custom order request? Send us a message!
      </p>
      <div className="bg-card shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
        <form action="https://fabform.io/f/{your-fabform-id}" method="POST" className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Your message here..."
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button type="submit" className="w-full">Send</Button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;