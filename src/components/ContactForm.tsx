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
    eventDate: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Custom Order Request:", formData);
    toast.success("Your custom order request has been sent! We'll be in touch soon.");

    setFormData({
      name: '',
      email: '',
      eventDate: '',
      message: '',
    });
    setIsSubmitting(false);
  };

  return (
    <section className="w-full max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-foreground">Custom Orders & Events</h2>
      <p className="text-center text-muted-foreground mb-8">
        Planning a party or special event? We'd love to create custom cookie orders just for you!
        Fill out the form below and we'll get back to you to discuss your sweet needs.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Your Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="eventDate">Event Date (Optional)</Label>
          <Input
            id="eventDate"
            type="date"
            value={formData.eventDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="message">Tell us about your order!</Label>
          <Textarea
            id="message"
            placeholder="I'm looking for 5 dozen custom-decorated cookies for a birthday party on..."
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending Request..." : "Send Custom Order Request"}
        </Button>
      </form>
    </section>
  );
};

export default ContactForm;