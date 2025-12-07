'use client';

// #region === Imports ===
// React
import { useState } from 'react';
// Third-party libraries
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslations } from 'next-intl';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// Styles
import css from './CamperBookingForm.module.css';
// #endregion

// #region === Types ===
interface CamperBookingFormProps {
  camperId: string;
  camperName: string;
}
// #endregion

// #region === Validation Schema ===
const createBookingSchema = (t: (key: string) => string) =>
  Yup.object({
    name: Yup.string()
      .trim()
      .min(2, t('validation.nameMin'))
      .max(40, t('validation.nameMax'))
      .required(t('validation.required')),
    email: Yup.string()
      .trim()
      .lowercase()
      .email(t('validation.invalidEmail'))
      .required(t('validation.required')),
    date: Yup.string().required(t('validation.required')),
    message: Yup.string().trim().max(500, t('validation.messageMax')),
  });
// #endregion

// #region === Component ===
export default function CamperBookingForm({
  camperId,
  camperName,
}: CamperBookingFormProps) {
  // --- Translations ---
  const t = useTranslations('CamperBookingForm');

  // --- Validation Schema with translations ---
  const BookingSchema = createBookingSchema(t);

  // --- State ---
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // --- Handlers ---
  const handleSubmit = async (
    values: { name: string; email: string; date: string; message: string },
    { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setStatus('idle');
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, camperId }),
      });
      if (!res.ok) {
        throw new Error('Request failed');
      }
      setStatus('success');
      resetForm();
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  // --- Render ---
  return (
    <div className={css.card}>
      {/* Header */}
      <h3 className={css.title}>{t('title')}</h3>
      <p className={css.subtitle}>{t('subtitle', { camper: camperName })}</p>

      {/* Booking Form */}
      <Formik
        initialValues={{ name: '', email: '', date: '', message: '' }}
        validationSchema={BookingSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className={css.form}>
            {/* Name Field */}
            <label className={css.label}>
              <Field name="name" className={css.input} placeholder={t('namePlaceholder')} />
              <ErrorMessage name="name" component="span" className={css.error} />
            </label>

            {/* Email Field */}
            <label className={css.label}>

              <Field
                name="email"
                type="email"
                className={css.input}
                placeholder={t('emailPlaceholder')}
              />
              <ErrorMessage name="email" component="span" className={css.error} />
            </label>

            {/* Date Field */}
            <label className={css.label}>
              <DatePicker
                selected={values.date ? new Date(values.date) : null}
                onChange={(date: Date | null) => {
                  setFieldValue('date', date ? date.toISOString().split('T')[0] : '');
                }}
                placeholderText={t('datePlaceholder')}
                className={css.input}
                dateFormat="dd.MM.yyyy"
                minDate={new Date()}
                calendarStartDay={1}
              />
              <ErrorMessage name="date" component="span" className={css.error} />
            </label>

            {/* Comment Field */}
            <label className={css.label}>

              <Field
                as="textarea"
                name="message"
                rows={3}
                className={css.textarea}
                placeholder={t('commentPlaceholder')}
              />
              <ErrorMessage name="message" component="span" className={css.error} />
            </label>

            {/* Submit Button */}
            <button type="submit" className={`btn-primary ${css.submit}`} disabled={isSubmitting}>
              {isSubmitting ? t('sending') : t('submit')}
            </button>

            {/* Status Messages */}
            {status === 'success' && <p className={css.success}>{t('success')}</p>}
            {status === 'error' && <p className={css.error}>{t('error')}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
}
// #endregion
