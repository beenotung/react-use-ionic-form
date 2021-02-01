import React, { useState } from 'react';
import { IonItem, IonLabel } from '@ionic/react';

export type IonFormItemOptions<
  T extends object,
  K extends keyof T,
  E extends CustomEvent
> = {
  state: T;
  setState: (state: T) => void;
  name: K;
  label?: string;
  renderContent: (props: {
    name: string;
    onIonChange: (e: any) => void;
    value?: T[K];
    checked?: boolean;
  }) => JSX.Element;
  mapValue?: (e: E, currentValue: T[K]) => T[K];
  renderLabel?: typeof IonFormItemOptions.Label;
};

export function IonFormItem<
  T extends object,
  K extends keyof T,
  E extends CustomEvent
>(props: IonFormItemOptions<T, K, E>) {
  let renderLabel = props.renderLabel || IonFormItemOptions.Label;

  function onIonChange(e: E) {
    console.log(e);
    let value = 'checked' in e.detail ? e.detail.checked : e.detail.value;
    if (props.mapValue) {
      value = props.mapValue(e, props.state[props.name]);
    }
    props.setState({ ...props.state, [props.name]: value });
  }

  return (
    <IonItem>
      {renderLabel(props)}
      {props.renderContent({
        name: props.name.toString(),
        onIonChange,
        value: props.state[props.name],
        checked: props.state[props.name] as any,
      })}
    </IonItem>
  );
}

export let IonFormItemOptions = {
  Label: function Label(props: { label?: string; name: PropertyKey }) {
    let label: string = props.label || props.name.toString();
    return <IonLabel>{label}</IonLabel>;
  },
};

export type UseIonFormItemOptions<
  T extends object,
  K extends keyof T,
  E extends CustomEvent
> = {
  name: K;
  label?: string;
  renderContent: (props: {
    onIonChange: (e: any) => void;
    value?: T[K];
    checked?: boolean;
  }) => JSX.Element;
  mapValue?: (event: E, currentValue: T[K]) => T[K];
  renderLabel?: typeof IonFormItemOptions.Label;
};

export function useIonFormState<T extends object>(initialValue: T = {} as T) {
  let [state, setState] = useState<T>(initialValue);

  function reset() {
    setState(initialValue);
  }

  return {
    state,
    setState,
    reset,
    item<K extends keyof T, E extends CustomEvent>(
      props: UseIonFormItemOptions<T, K, E>,
    ) {
      return <IonFormItem state={state} setState={setState} {...props} />;
    },
  };
}
