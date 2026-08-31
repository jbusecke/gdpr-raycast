# GDPR Notice

Raycast extension for Apple Mail. Select a marketing email in Mail, run **Write GDPR Notice**, and review the reply draft that opens in Mail. The draft objects under Article 21 GDPR and requests erasure under Article 17 GDPR. The command also moves the message to the Junk mailbox. Turn this off with the **Junk** preference.

## Use

1. `npm install`
2. `npm run dev` — imports the extension into Raycast.
3. Set the **Your Name** preference in Raycast.
4. Select a message in Mail and run **Write GDPR Notice**.

`npm run dev` runs `ray develop`: it imports the extension into Raycast and watches
the source for changes. The import remains after the command exits; run it again only
after changing the extension or when it needs to be re-imported. File watching stops
when the command exits.

## Develop

- Run `npm install` before `npm run build`. The project installs the local `ray` CLI; installing the Raycast app alone does not.
- `npm test` — unit tests for the notice template.
- `npm run build` — typecheck and build.
