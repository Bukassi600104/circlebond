import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import { CalendarDays, Upload } from "lucide-react";
import PhoneNumberInput, {
  type Value as PhoneNumberValue,
} from "react-phone-number-input";

type FieldState = "default" | "success" | "error";

function FieldShell({
  children,
  helper,
  id,
  label,
  required,
  state = "default",
}: {
  children: ReactNode;
  helper?: string;
  id: string;
  label: string;
  required?: boolean;
  state?: FieldState;
}) {
  const helperId = helper ? `${id}-helper` : undefined;
  return (
    <div className={`bc-field bc-field--${state}`}>
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {helper && (
        <p id={helperId} role={state === "error" ? "alert" : undefined}>
          {helper}
        </p>
      )}
    </div>
  );
}

export function TextInput({
  helper,
  id,
  label,
  state,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  helper?: string;
  id: string;
  label: string;
  state?: FieldState;
}) {
  return (
    <FieldShell
      helper={helper}
      id={id}
      label={label}
      required={props.required}
      state={state}
    >
      <input
        id={id}
        aria-describedby={helper ? `${id}-helper` : undefined}
        aria-invalid={state === "error" || undefined}
        {...props}
      />
    </FieldShell>
  );
}

export function PhoneInput(
  props: Omit<React.ComponentProps<typeof TextInput>, "type">,
) {
  return <TextInput type="tel" inputMode="tel" autoComplete="tel" {...props} />;
}

export function CountryPhoneInput({
  helper = "Choose a country, then enter your phone number.",
  id,
  label,
  onChange,
  required,
  value,
}: {
  helper?: string;
  id: string;
  label: string;
  onChange: (value: string) => void;
  required?: boolean;
  value: string;
}) {
  return (
    <FieldShell helper={helper} id={id} label={label} required={required}>
      <PhoneNumberInput
        id={id}
        className="bc-country-phone"
        defaultCountry="NG"
        international
        countryCallingCodeEditable={false}
        value={(value || undefined) as PhoneNumberValue | undefined}
        onChange={(nextValue) => onChange(nextValue ?? "")}
        aria-describedby={`${id}-helper`}
        required={required}
      />
    </FieldShell>
  );
}

export function EmailInput(
  props: Omit<React.ComponentProps<typeof TextInput>, "type">,
) {
  return (
    <TextInput type="email" inputMode="email" autoComplete="email" {...props} />
  );
}

export function AmountInput(
  props: Omit<React.ComponentProps<typeof TextInput>, "type">,
) {
  return (
    <div className="bc-amount-field">
      <span aria-hidden="true">₦</span>
      <TextInput type="text" inputMode="decimal" {...props} />
    </div>
  );
}

export function DatePicker(
  props: Omit<React.ComponentProps<typeof TextInput>, "type">,
) {
  return (
    <div className="bc-date-field">
      <TextInput type="date" {...props} />
      <CalendarDays size={18} aria-hidden="true" />
    </div>
  );
}

export function Textarea({
  helper,
  id,
  label,
  state,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  helper?: string;
  id: string;
  label: string;
  state?: FieldState;
}) {
  return (
    <FieldShell
      helper={helper}
      id={id}
      label={label}
      required={props.required}
      state={state}
    >
      <textarea
        id={id}
        aria-describedby={helper ? `${id}-helper` : undefined}
        aria-invalid={state === "error" || undefined}
        {...props}
      />
    </FieldShell>
  );
}

export function OtpInput({ length = 6 }: { length?: number }) {
  return (
    <fieldset className="bc-otp">
      <legend>Verification code</legend>
      <div>
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            aria-label={`Digit ${index + 1} of ${length}`}
            inputMode="numeric"
            maxLength={1}
            pattern="[0-9]*"
          />
        ))}
      </div>
    </fieldset>
  );
}

export function UploadField({
  accept = ".jpg,.jpeg,.png,.heic",
  helper = "JPG, PNG or HEIC, up to 5 MB",
  id,
  label,
}: {
  accept?: string;
  helper?: string;
  id: string;
  label: string;
}) {
  return (
    <div className="bc-upload">
      <input id={id} type="file" accept={accept} />
      <label htmlFor={id}>
        <Upload size={22} aria-hidden="true" />
        <strong>{label}</strong>
        <span>{helper}</span>
      </label>
    </div>
  );
}
