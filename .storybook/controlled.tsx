import { useArgs } from '@storybook/preview-api';
import type { ComponentType } from 'react';

type ControlledOptions = {
  /** Arg key that holds the controlled value. Default: `value` */
  valueKey?: string;
  /** Callback arg that receives the next value. Default: `onValueChange` */
  onChangeKey?: string;
  /** Map callback payload into args (for multi-field updates). */
  mapChange?: (next: unknown) => Record<string, unknown>;
};

/**
 * Story render helper for controlled components so canvas interactions update args.
 */
export function controlledRender<P extends Record<string, unknown>>(
  Component: ComponentType<P>,
  options: ControlledOptions = {},
) {
  const valueKey = options.valueKey ?? 'value';
  const onChangeKey = options.onChangeKey ?? 'onValueChange';
  const mapChange = options.mapChange;

  return function ControlledStory(args: P) {
    const [, setArgs] = useArgs();
    const original = args[onChangeKey];

    return (
      <Component
        {...args}
        {...{
          [onChangeKey]: (next: unknown) => {
            if (typeof original === 'function') {
              (original as (value: unknown) => void)(next);
            }
            setArgs(mapChange ? mapChange(next) : { [valueKey]: next });
          },
        }}
      />
    );
  };
}
