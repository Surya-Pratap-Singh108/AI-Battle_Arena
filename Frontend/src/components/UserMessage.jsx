export default function UserMessage({ message }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-2xl bg-primary-container text-on-primary-container p-6 rounded-xl rounded-br-sm shadow-sm">
        <p className="font-body text-md leading-relaxed whitespace-pre-wrap">
          {message}
        </p>
      </div>
    </div>
  );
}
