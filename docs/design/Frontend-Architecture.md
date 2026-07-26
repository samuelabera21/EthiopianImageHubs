app/

Only pages.

Never place business logic here.

---------------------

components/

Reusable UI only.

Never fetch data here.

---------------------

features/

Feature-specific components.

Authentication

Gallery

Upload

Profile

Admin

---------------------

services/

Backend API communication only.

Never call fetch() inside components.

---------------------

hooks/

Reusable custom hooks.

---------------------

lib/

Third-party configuration.

Axios

TanStack Query

Theme

---------------------

utils/

Pure helper functions.

---------------------

types/

Shared interfaces.

---------------------

constants/

Application constants.

---------------------

public/

Static assets.