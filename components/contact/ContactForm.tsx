'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'

interface FormValues {
  name: string
  email: string
  message: string
}

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Send failed')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-text-body">
          Message received — I&rsquo;ll get back to you soon!
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
      {/* Name */}
      <div className="relative">
        <input
          id="name"
          type="text"
          placeholder=" "
          {...register('name', { required: 'Name is required' })}
          className={`peer w-full px-4 pt-6 pb-2 text-text-body bg-transparent border rounded-small outline-none transition-colors duration-200 ${
            errors.name ? 'border-status-error' : 'border-border-light focus:border-border-dark'
          }`}
        />
        <label
          htmlFor="name"
          className="absolute left-4 top-4 text-sm text-text-secondary transition-all duration-200
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
            peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-accent-pink
            peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-xs"
        >
          Name
        </label>
        {errors.name && (
          <p className="mt-1 text-xs text-status-error">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="relative">
        <input
          id="email"
          type="email"
          placeholder=" "
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          })}
          className={`peer w-full px-4 pt-6 pb-2 text-text-body bg-transparent border rounded-small outline-none transition-colors duration-200 ${
            errors.email ? 'border-status-error' : 'border-border-light focus:border-border-dark'
          }`}
        />
        <label
          htmlFor="email"
          className="absolute left-4 top-4 text-sm text-text-secondary transition-all duration-200
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
            peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-accent-pink
            peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-xs"
        >
          Email
        </label>
        {errors.email && (
          <p className="mt-1 text-xs text-status-error">{errors.email.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="relative">
        <textarea
          id="message"
          rows={6}
          placeholder=" "
          {...register('message', { required: 'Message is required' })}
          className={`peer w-full px-4 pt-6 pb-2 text-text-body bg-transparent border rounded-small outline-none resize-none transition-colors duration-200 ${
            errors.message ? 'border-status-error' : 'border-border-light focus:border-border-dark'
          }`}
        />
        <label
          htmlFor="message"
          className="absolute left-4 top-4 text-sm text-text-secondary transition-all duration-200
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
            peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-accent-pink
            peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-xs"
        >
          Message
        </label>
        {errors.message && (
          <p className="mt-1 text-xs text-status-error">{errors.message.message}</p>
        )}
      </div>

      {status === 'error' && (
        <p className="text-sm text-status-error">
          Something went wrong — please try again.
        </p>
      )}

      <div>
        <Button
          type="submit"
          variant="dark"
          disabled={status === 'submitting'}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending…' : 'Send Away!'}
        </Button>
      </div>
    </form>
  )
}
