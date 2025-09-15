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
    phone: '',
    subject: '',
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
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-4">
      <div className="bg-card shadow-md rounded-lg p-8 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold text-foreground mb-4">Contact us</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Have questions or need assistance? We're here to help! Reach out to our team
            for support, inquiries, or collaboration opportunities.
          </p>
          <form action="https://fabform.io/f/{your-fabform-id}" method="POST" className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone No.</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter Phone No."
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <Label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Enter Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Enter Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-y"
              />
            </div>
            <Button type="submit" className="w-full py-3 text-lg bg-primary text-primary-foreground hover:bg-primary/90">Send message</Button>
          </form>
        </div>
        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src="/images/contact-form-cookies.png"
            alt="Assortment of delicious cookies"
            className="rounded-lg object-cover w-full h-full max-h-[500px] md:max-h-none"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactForm;