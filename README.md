# Reproxy
This app could be used to create a simple reverse proxy in order to be able to make local development for openUI5 apps.

## Configuration
All the configuration for reproxy is made in the config.json file
``` javascript
{
  "rules":{ <-- rules object where you can translate from local url specified in manifest.json to the target oData service
    "/destinations/ES4/*": "https://sapes4.sapdevcenter.com"
  },
  "auth":{ <-- auth optional object storing basic authentication for a target oData
    "https://sapes4.sapdevcenter.com/sap/opu/odata/IWBEP/GWSAMPLE_BASIC/": {
      "user":"username",
      "passwd":"password"
    }
  },
  "default": "http://localhost:3000" <-- route pointing to the web server exposing openUI5 app
}
```

## How to use
Use *serve* command to expose your openUI5 app
( you can install it with the command `npm install -g serve` ).
Make sure that the default route of reproxy point to the exposed app, then use other rules to point to
the oData destinations you need, bypassign this way the CORS.
