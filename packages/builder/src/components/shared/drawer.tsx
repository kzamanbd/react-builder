import { DialogProps, Drawer as DrawerPrimitive } from "vaul";
import { classNames } from "@/utils";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  ReactNode,
} from "react";

export const Drawer = ({ children, ...props }: DialogProps) => {
  return <DrawerPrimitive.Root {...props}>{children}</DrawerPrimitive.Root>;
};

Drawer.displayName = "Drawer";

const Trigger = forwardRef<
  ElementRef<typeof DrawerPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Trigger>
>(({ children, ...props }, ref) => {
  return (
    <DrawerPrimitive.Trigger ref={ref} {...props}>
      {children}
    </DrawerPrimitive.Trigger>
  );
});

Trigger.displayName = "DrawerTrigger";

const Portal = DrawerPrimitive.Portal;

const Close = DrawerPrimitive.Close;

interface ContentProps
  extends ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> {
  children: ReactNode;
}

const Content = forwardRef<
  ElementRef<typeof DrawerPrimitive.Content>,
  ContentProps
>(({ children, className, ...props }, ref) => {
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40" />
      <DrawerPrimitive.Content
        ref={ref}
        className={classNames(
          "fixed bottom-0 left-0 right-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border border-gray-200 bg-white",
          className
        )}
        {...props}
      >
        <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-gray-200" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  );
});

Content.displayName = "DrawerContent";

const Header = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={classNames(
        "grid gap-1.5 p-4 text-center sm:text-left",
        className
      )}
      {...props}
    />
  )
);

Header.displayName = "DrawerHeader";

const Footer = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={classNames("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
);

Footer.displayName = "DrawerFooter";

const Title = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={classNames(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));

Title.displayName = "DrawerTitle";

const Description = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={classNames("text-sm text-gray-500", className)}
    {...props}
  />
));

Description.displayName = "DrawerDescription";

Drawer.Trigger = Trigger;
Drawer.Content = Content;
Drawer.Header = Header;
Drawer.Footer = Footer;
Drawer.Title = Title;
Drawer.Description = Description;
Drawer.Portal = Portal;
Drawer.Close = Close;
