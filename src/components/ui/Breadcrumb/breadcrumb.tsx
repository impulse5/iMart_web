import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

const Breadcrumb = React.forwardRef<
HTMLElement,
{
  items: {
    text: string
    link?: string
    current?: boolean
  }[]
} &
React.ComponentPropsWithoutRef<"nav"> & {
  separator?: React.ReactNode
}
>(({ items, ...props }, ref) => (
  <nav ref={ref} aria-label="breadcrumb" {...props}>
    <BreadcrumbList items={items} />
  </nav>
))

Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  {
    items: {
      text: string
      link?: string
      current?: boolean
    }[]
  } &
  React.ComponentPropsWithoutRef<"ol">
>(({ items, className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center font-normal text-primary gap-1.5 break-words text-sm sm:gap-2.5",
      className
    )}
    {...props}
  >
    {items.map((item: any, index: any) => (
      <React.Fragment key={index}>
        <BreadcrumbItem>
          <BreadcrumbLink
            className={cn("transition-colors hover:text-foreground", {
              "font-bold": item.current,
            })}
          >
            {item.link ? <Link to={item.link}>{item.text}</Link> : item.text} 
          </BreadcrumbLink>
        </BreadcrumbItem>
        {index < items.length - 1 && <BreadcrumbSeparator />}
      </React.Fragment>
    ))}
  </ol>
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
