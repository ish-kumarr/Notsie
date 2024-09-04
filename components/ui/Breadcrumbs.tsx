"use client"

import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Fragment } from "react";

function Breadcrumbs() {
  const path = usePathname();
  const segments = path.split("/");

  console.log(segments)

  return (
<div className="bg-gray-200 py-2 px-4 rounded-full inline-flex items-center hidden md:inline-flex">

<Breadcrumb>
        <BreadcrumbList className="flex space-x-2">
          <BreadcrumbItem>
            <span className="px-3 py-1 bg-gray-100 rounded-full">
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </span>
          </BreadcrumbItem>
          {segments.map((segment, index) => {
            if (!segment) return null;

            const href = `/${segments.slice(0, index + 1).join("/")}`;
            const isLast = index === segments.length - 1;

            return (
              <Fragment key={segment}>
                <BreadcrumbSeparator className="mx-2">/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  {isLast ? (
                    <span className="px-3 py-1 bg-gray-100 rounded-full">
                      <BreadcrumbPage>{segment}</BreadcrumbPage>
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-gray-100 rounded-full">
                      <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                    </span>
                  )}
                </BreadcrumbItem>
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default Breadcrumbs;
