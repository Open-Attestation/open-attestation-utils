# open-attestation-utils

This is a repository that houses shared project logic between Open Attestation and TradeTrust.

## Getting Started - Install

```
npm i @govtechsg/open-attestation-utils
```

### Direct import

If the consuming application does not support treeshaking, you should do direct import instead. Example:

```
import { FiatLabel } from "@govtechsg/open-attestation-utils/components/FiatLabel";
```

### Available Utility Functions

| Function Name    | Description               |
| ---------------- | ------------------------- |
| useFetchGasPrice | get the current gas price |

### Available Common Components

| Component |
| --------- |
| FiatLabel |
