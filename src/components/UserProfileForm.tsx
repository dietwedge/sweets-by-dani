import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Profile } from '@/types/db';
import { toast } from 'sonner';

interface UserProfileFormProps {
  initialData: Profile | null;
  onSubmit: (profile: Omit<Profile, 'id' | 'created_at' | 'updated_at'>) => void;
  onCancel: () => void;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    home_address: '',
    phone_number: '',
  });
  const [errors, setErrors] = useState({
    full_name: '',
    email: '',
    home_address: '',
    phone_number: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        full_name: initialData.full_name || '',
        email: initialData.email || '',
        home_address: initialData.home_address || '',
        phone_number: initialData.phone_number || '',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error for the field being edited
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      full_name: '',
      email: '',
      home_address: '',
      phone_number: '',
    };

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Name is required.';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
      isValid = false;
    }
    if (!formData.home_address.trim()) {
      newErrors.home_address = 'Home address is required.';
      isValid = false;
    }
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = 'Phone number is required.';
      isValid = false;
    } else if (!/^\+?[0-9\s\-()]{7,20}$/.test(formData.phone_number)) { // Basic phone number regex
      newErrors.phone_number = 'Phone number is invalid.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    } else {
      toast.error("Please correct the errors in the form.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <Label htmlFor="full_name">Full Name</Label>
        <Input
          id="full_name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          placeholder="Your Full Name"
          required
        />
        {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
      <div>
        <Label htmlFor="home_address">Home Address</Label>
        <Input
          id="home_address"
          name="home_address"
          value={formData.home_address}
          onChange={handleChange}
          placeholder="Your Home Address"
          required
        />
        {errors.home_address && <p className="text-red-500 text-sm mt-1">{errors.home_address}</p>}
      </div>
      <div>
        <Label htmlFor="phone_number">Phone Number</Label>
        <Input
          id="phone_number"
          name="phone_number"
          type="tel"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Your Phone Number"
          required
        />
        {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>}
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default UserProfileForm;