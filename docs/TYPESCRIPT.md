# Typesript

This starter is built with typescript in mind, as a first class citizen.
- Webpack Aliases, as well as jest module mappings are derived automagically from tsconfig.json.
This means that navigating to a type definition just works, the same as the runtime and test runtime

- Type modules are co located with the source code in various folders under a types folder.
You don't need to jump far in the folder hierarchy to have a peek at a type file.

- A Global "Server/types" alias aggregates type folders so that importing types is clean and straightforward:

```typescript
import {ILiveInHttp, ILiveInModels} from "Server/types"
```