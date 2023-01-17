import React from "react"
import {BasePageTemplate} from "scholastic-client-components/src/ui/BasePageTemplate"

export const ExamplePage: React.FC = () => (
    <BasePageTemplate>
        {{
            title: "Example Page",
            content: (
                <div
                    style={{
                        padding: "5rem",
                        display: "flex",
                        justifyContent: "center",
                        background: "#003a58",
                    }}
                >
                    <img src={"graphics/Logo.svg"} alt={""} width={200} />
                </div>
            ),
        }}
    </BasePageTemplate>
)
