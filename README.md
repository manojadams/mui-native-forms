# mui-native-forms

Material UI forms for react native

## Installation

```sh
npm install mui-native-forms
```

## Usage


```js
import React from 'react-native';
import MuiNativeForms from 'mui-native-forms';
import exampleSchema from '<example-schema.json>';

export function MyForm() {
    return (
        <View>
            <MuiNativeForms
                schema={exampleSchema}
                onSubmit={(formData) => {
                // submit data
                }}
            />
        </View>
    );
}
```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---
