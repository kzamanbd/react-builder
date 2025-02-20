interface Window {
  frameWindow?: Window;
  frameDocument?: Document;
  Razorpay?: Constructable<{
    open: () => void;
  }>;
  payfast_do_onsite_payment?: (
    { uuid: string },
    callback: (result: boolean) => void
  ) => void;
}
