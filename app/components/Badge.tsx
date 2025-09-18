// app/components/Badge.tsx

export const Badge = ({ text }: { text: string }) => {
  return (
    <div className="bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-tl-2xl rounded-br-xl">
      {text}
    </div>
  );
};