import { ReactNode } from "react";

export function AuthWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col justify-center py-10 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl ring-1 ring-gray-900/10 sm:rounded-lg sm:px-10 dark:bg-white dark:text-gray-900">
          <div className="my-2">{children}</div>
        </div>
      </div>
    </div>
  );
}