import { FC, HTMLAttributes, ReactNode } from "react";
import Select from "@/components/shared/select";
import Label from "@/components/shared/label";
import { classNames } from "@/utils";
import { useAppSelector } from "@/hooks/use-app-selector";
import { getCurrentBreakpoint } from "@/store/selectors";
import { PseudoClass } from "@/types/style";
import BreakpointSelector from "../shared/breakpoint-selector";
import { VariantProps, cva } from "class-variance-authority";
import { createId } from "../../utils";
import { SettingsType } from "@/types";
import { useSettings } from "@/hooks/use-settings";

const controlVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row justify-between items-center",
      col: "flex-col",
    },
  },
  defaultVariants: {
    direction: "row",
  },
});

type SelectOption = {
  value: string | undefined;
  content: ReactNode;
};

type SelectControlProps = {
  options: SelectOption[];
  placeholder?: ReactNode;
  type: SettingsType;
  fieldName: string;
  label: ReactNode;
  responsive?: boolean;
  mode?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
} & HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof controlVariants>;

const SelectControl: FC<SelectControlProps> = ({
  placeholder,
  options,
  fieldName,
  type = SettingsType.BLOCK,
  label,
  className,
  responsive = false,
  mode,
  direction,
  onValueChange,
  defaultValue,
}) => {
  const currentBreakpoint = useAppSelector(getCurrentBreakpoint);
  const [value, setValue] = useSettings<string>(
    responsive && mode
      ? `${fieldName}.${currentBreakpoint}.${mode}`
      : responsive
        ? `${fieldName}.${currentBreakpoint}`
        : mode
          ? `${fieldName}.${mode}`
          : fieldName,
    type
  );

  const autoId = createId();
  return (
    <div
      className={classNames(
        "mt-4 w-full gap-1.5",
        controlVariants({ direction, className })
      )}
    >
      {label && (
        <Label htmlFor={autoId} className="flex flex-1 items-center gap-1">
          {label} {responsive && <BreakpointSelector />}
        </Label>
      )}

      <Select
        onValueChange={(val) => {
          setValue(val);
          onValueChange?.(val);
        }}
        value={value ? value : defaultValue ? undefined : ""}
        defaultValue={defaultValue}
      >
        <Select.Trigger id={autoId} className="flex-1 bg-white">
          <Select.Value placeholder={placeholder} />
        </Select.Trigger>

        <Select.Content>
          {options.map((opt, i) => (
            <Select.Item value={opt.value ?? ""} key={i}>
              {opt.content}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  );
};

export default SelectControl;
