signup_spec = {
    "parameters": [
        {
            "name": "palette",
            "in": "path",
            "type": "string",
            "enum": [
                "all",
                "rgb",
                "cmyk"
            ],
            "required": True,
            "default": "all"
        }
    ],
    "definitions": {
        "Palette": {
            "type": "object",
            "properties": {
                "palette_name": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Color"
                    }
                }
            }
        },
        "Color": {
            "type": "string"
        }
    },
    "responses": {
        "200": {
            "description": "A list of colors (may be filtered by palette)",
            "schema": {
                "$ref": "#/definitions/Palette"
            },
            "examples": {
                "rgb": [
                    "red",
                    "green",
                    "blue"
                ]
            }
        }
    }
}
