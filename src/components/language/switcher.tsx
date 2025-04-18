'use client';

import React from "react";
import { useRouter , usePathname } from "next/navigation";
import { useLocale } from "next-intl";

const LanguageSwitcher = () => {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (newLocale: string) => {
        const currentPathname = pathname;
        let newPath = currentPathname;

        if(currentPathname.startsWith(`/${locale}`)) {
            newPath = currentPathname.replace(`/${locale}`, `/${newLocale}`);
        }else{
            newPath = `/${newLocale}${currentPathname}`;
        }
        router.push(newPath);
    }
    return (
        <div className="absolute top-4 right-20 z-10">
          <select
            className="bg-black/50 p-2 rounded text-white"
            value={locale}
            onChange={(e) => switchLocale(e.target.value)}
          >
            <option value="zh">中文</option>
            <option value="en">English</option>
          </select>
        </div>
      );
}

export default LanguageSwitcher;
