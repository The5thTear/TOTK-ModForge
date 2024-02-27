# Relavant Nodes - Guardian Beam

ToDo Tomorrow:

- Check CannonBall AI, figure out how it is moving.

- Implement scaling.

- Add glowy sheikah material.

- Research explosion effect.

- Make guardians bone follow the player.

```json
        "ExecuteModelRotateBoneLocalMatrix": {
            "Inputs": {
                "Bool": {
                    "IsResetOnLeave": {
                        "default": false
                    }
                },
                "Float": {
                    "RotateAngle": {
                        "default": "0"
                    }
                },
                "String": {
                    "BoneName": {
                        "default": "Root"
                    }
                },
                "game::RotationAxis": {
                    "RotateAxis": {
                        "default": "X"
                    }
                }
            },
            "Tags": [
                "Execute",
                "Model"
            ]
        },
          
        "QueryMathVectorDogRotateToAngle": {
            "Inputs": {
                "Vector3": {
                    "ActorPos": {
                        "default": [
                            0,
                            0,
                            0
                        ]
                    },
                    "PlayerPos": {
                        "default": [
                            0,
                            0,
                            0
                        ]
                    }
                }
            },
            "Tags": [
                "Query"
            ]
        },

        "ExecutePhysicsCctRotateToTarget": {
            "Inputs": {
                "Float": {
                    "RotateAngleRate": {
                        "default": "0.05"
                    }
                },
                "Vector3": {
                    "TargetPos": {
                        "default": [
                            0,
                            0,
                            0
                        ]
                    }
                }
            },
            "Tags": [
                "Execute",
                "Physics"
            ]
        },

        "QueryDirRotateToTargetFromBone": {
            "Inputs": {
                "Bool": {
                    "IsActiveHoldEvent": {
                        "default": false
                    },
                    "IsPulseHoldEvent": {
                        "default": false
                    }
                },
                "String": {
                    "BoneName": {
                        "default": "Root"
                    },
                    "Partial": {
                        "default": ""
                    }
                },
                "Vector3": {
                    "TargetPos": {
                        "default": [
                            0,
                            0,
                            0
                        ]
                    }
                }
            },
            "Tags": [
                "CharacterController",
                "Query",
                "Physics"
            ]
        },

        "QueryMathAddCalcRotate": {
            "Inputs": {
                "Float": {
                    "MaxAngleRad": {
                        "default": "3.14159"
                    },
                    "MinAngleRad": {
                        "default": "0"
                    },
                    "Rate": {
                        "default": "0.5"
                    }
                },
                "Vector3": {
                    "FromVector": {
                        "default": [
                            0,
                            0,
                            0
                        ]
                    },
                    "ToVector": {
                        "default": [
                            0,
                            0,
                            0
                        ]
                    }
                }
            },
            "Tags": [
                "Math",
                "Query"
            ]
        },
```

```json
        {
            "Node Type": "UserDefined",
            "Node Index": 7,
            "Flags": [
                "Is Precondition Node"
            ],
            "Name": "QueryMathAddCalcRotate",
            "Base Precondition Node": 0,
            "GUID": "5b506f2a-d32e-4643-8580-b9b7b9ba8b52",
            "Precondition Nodes": [
                (Node That Gets Parent Cords),
                (Node That Gets Player Cords)
            ],
            "Immediate Parameters": {
                "bool": [
                    {
                        "Name": "OutputOnlyOnEnter",
                        "Value": false
                    }
                ]
            },
            "Input Parameters": {
                "float": [
                    {
                        "Name": "MaxAngleRad",
                        "Node Index": -1,
                        "Parameter Index": 0,
                        "Global Parameters Index": 0,
                        "Value": 3.141590118408203
                    },
                    {
                        "Name": "MinAngleRad",
                        "Node Index": -1,
                        "Parameter Index": 0,
                        "EXB Index": 0,
                        "Function": {
                            "Base Index Pre-Command Entry": -1,
                            "Pre-Entry Static Memory Usage": 0,
                            "Instructions": [
                                {
                                    "Type": "Store",
                                    "Data Type": "s32",
                                    "LHS Source": "StaticMem",
                                    "RHS Source": "Imm",
                                    "LHS Index/Value": 0,
                                    "RHS Index/Value": 0,
                                    "RHS Value": 0
                                },
                                {
                                    "Type": "UserFunction",
                                    "Data Type": "f32",
                                    "Static Memory Index": 0,
                                    "Signature": "GetBBCodeFloat( Float, Int )"
                                },
                                {
                                    "Type": "Store",
                                    "Data Type": "s32",
                                    "LHS Source": "StaticMem",
                                    "RHS Source": "Imm",
                                    "LHS Index/Value": 4,
                                    "RHS Index/Value": 4,
                                    "RHS Value": 4
                                },
                                {
                                    "Type": "UserFunction",
                                    "Data Type": "f32",
                                    "Static Memory Index": 4,
                                    "Signature": "GetBBCodeFloat( Float, Int )"
                                },
                                {
                                    "Type": "Multiply",
                                    "Data Type": "f32",
                                    "LHS Source": "StaticMem",
                                    "RHS Source": "StaticMem",
                                    "LHS Index/Value": 0,
                                    "RHS Index/Value": 4
                                },
                                {
                                    "Type": "Store",
                                    "Data Type": "f32",
                                    "LHS Source": "Output",
                                    "RHS Source": "StaticMem",
                                    "LHS Index/Value": 0,
                                    "RHS Index/Value": 0
                                },
                                {
                                    "Type": "Terminator"
                                }
                            ]
                        },
                        "Value": 0.0
                    },
                    {
                        "Name": "Rate",
                        "Node Index": -1,
                        "Parameter Index": 0,
                        "Global Parameters Index": 3,
                        "Value": 0.5
                    }
                ],
                "vec3f": [
                    {
                        "Name": "FromVector",
                        "Node Index": 21,
                        "Parameter Index": 0,
                        "Value": [
                            0.0,
                            0.0,
                            0.0
                        ]
                    },
                    {
                        "Name": "ToVector",
                        "Node Index": 38,
                        "Parameter Index": 0,
                        "Value": [
                            0.0,
                            0.0,
                            0.0
                        ]
                    }
                ]
            },
            "Output Parameters": {
                "bool": [
                    {
                        "Name": "IsReached"
                    }
                ],
                "vec3f": [
                    {
                        "Name": "Vector",
                        "Set Pointer Flag Bit Zero": true
                    }
                ]
            },
            "Linked Nodes": {
                "Output/bool Input/float Input Link": [
                    {
                        "Node Index": 39,
                        "Parameter": "Vector"
                    }
                ]
            }
        },
```