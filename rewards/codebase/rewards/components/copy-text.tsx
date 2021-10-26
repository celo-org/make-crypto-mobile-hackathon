import { useCallback, useState } from 'react';
import { BsCheck, BsClipboard } from 'react-icons/bs';

export function CopyText({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const onClick = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 4000);
  }, []);

  return (
    <button className="focus:outline-none" onClick={onClick}>
      {copied ? (
        <BsCheck className="text-green-700" />
      ) : (
        <BsClipboard className="text-gray-600 dark:text-gray-400" />
      )}
    </button>
  );
}
