# react-use-ionic-form

Use hook and layout wrapper for ionic input components

[![npm Package Version](https://img.shields.io/npm/v/react-use-ionic-form?maxAge=3600)](https://www.npmjs.com/package/react-use-ionic-form)

react-hook-form doesn't work well with IonInput and IonSelect. This package is written to help ionic users to enjoy similar (or better) development experiment than react-hook-form.

Demo: [https://react-use-ionic-form-demo.surge.sh](https://react-use-ionic-form-demo.surge.sh)

## Installation

```bash
## using npm
npm install react-use-ionic-form

## or using yarn
yarn add react-use-ionic-form

## or using pnpm
pnpm install react-use-ionic-form
```

## Typescript Signature
```typescript
export declare function useIonFormState<T extends object>(initialValue?: T): {
    state: T;
    setState: React.Dispatch<React.SetStateAction<T>>;
    reset: () => void;
    item<K extends keyof T, E extends CustomEvent<any>>(props: UseIonFormItemOptions<T, K, E>): JSX.Element;
}

export declare type UseIonFormItemOptions<T extends object, K extends keyof T, E extends CustomEvent> = {
    name: K;
    label?: string;
    renderContent: (props: {
        onIonChange: (e: any) => void;
        value?: T[K];
        checked?: boolean;
    }) => JSX.Element;
    mapValue?: (event: E, currentValue: T[K]) => T[K];
    renderLabel?: typeof IonFormItemOptions.Label;
}
```

## Features
- [x] Auto updates the state
- [x] Auto render IonItem and IonLabel
- [x] Support validation via custom value mapper
- [x] Support custom label and IonLabel
- [x] Support additional content in ionItem (e.g. with `slot = 'start' | 'end'`)

## Usage Example
```typescript jsx
import React from 'react';
import {
  IonButton,
  IonCheckbox,
  IonInput,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { useIonFormState } from 'react-use-ionic-form'

const tags = ['apple', 'banana', 'cherry', 'orange'];

export default function DemoForm() {
  let { setState, state, reset, item } = useIonFormState({
    name: 'alice',
    age: 12,
    tags: ['apple', 'orange'],
  });
  return (
    <>
      <pre><code>{JSON.stringify(state, null, 2)}</code></pre>
      <div className="ion-text-center">
        <IonButton onClick={reset}>Reset</IonButton>
      </div>
      {item({
        name: 'name',
        label: 'Name',
        // override default Label renderer
        renderLabel: (props) => <IonLabel color="primary" position="floating">
          {props.label}
        </IonLabel>,
        renderContent: (props) => <IonInput type="text" {...props} />,
      })}
      {item({
        name: 'age',
        label: 'Age',
        mapValue: (value) => +value,
        renderContent: (props) => <IonInput type="number" {...props} />,
      })}
      {item({
        name: 'admin',
        label: 'Is Admin?',
        renderContent: (props) => (
          <>
            <IonCheckbox {...(props as any)} />
            <IonButton slot="end">additional content</IonButton>
          </>
        ),
      })}
      {item({
        name: 'tags',
        label: 'Tags',
        renderContent: (props) => (
          <IonSelect multiple {...props}>
            {tags.map((tag) => (
              <IonSelectOption key={tag} value={tag}>
                {tag}
              </IonSelectOption>
            ))}
          </IonSelect>
        ),
      })}
    </>
  );
}
```

Details see [DemoForm.tsx](./src/DemoForm.tsx)

## License
[BSD-2-Clause](./LICENSE) (Free Open Source Software)
