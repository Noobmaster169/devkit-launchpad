/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/amm_pool.json`.
 */
export type AmmPool = {
    "address": "DufGAh71LGiVvQGziRh7yKxAiZf1qafKUkzNEqHTRjYj",
    "metadata": {
      "name": "ammPool",
      "version": "0.1.0",
      "spec": "0.1.0",
      "description": "Created with Anchor"
    },
    "instructions": [
      {
        "name": "deposit",
        "discriminator": [
          242,
          35,
          198,
          137,
          82,
          225,
          242,
          182
        ],
        "accounts": [
          {
            "name": "pool",
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "pool.id",
                  "account": "pool"
                },
                {
                  "kind": "account",
                  "path": "pool.mint_a",
                  "account": "pool"
                },
                {
                  "kind": "account",
                  "path": "pool.mint_b",
                  "account": "pool"
                }
              ]
            }
          },
          {
            "name": "poolAuthority",
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "pool.id",
                  "account": "pool"
                },
                {
                  "kind": "account",
                  "path": "mintA"
                },
                {
                  "kind": "account",
                  "path": "mintB"
                },
                {
                  "kind": "const",
                  "value": [
                    97,
                    117,
                    116,
                    104,
                    111,
                    114,
                    105,
                    116,
                    121
                  ]
                }
              ]
            }
          },
          {
            "name": "depositor",
            "docs": [
              "The account paying for all rents"
            ],
            "signer": true
          },
          {
            "name": "mintLiquidity",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "pool.id",
                  "account": "pool"
                },
                {
                  "kind": "account",
                  "path": "mintA"
                },
                {
                  "kind": "account",
                  "path": "mintB"
                },
                {
                  "kind": "const",
                  "value": [
                    108,
                    105,
                    113,
                    117,
                    105,
                    100,
                    105,
                    116,
                    121
                  ]
                }
              ]
            }
          },
          {
            "name": "mintA",
            "relations": [
              "pool"
            ]
          },
          {
            "name": "mintB",
            "relations": [
              "pool"
            ]
          },
          {
            "name": "poolAccountA",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "poolAuthority"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mintA"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "poolAccountB",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "poolAuthority"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mintB"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "depositorAccountLiquidity",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "depositor"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mintLiquidity"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "depositorAccountA",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "depositor"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mintA"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "depositorAccountB",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "depositor"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mintB"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "payer",
            "docs": [
              "The account paying for all rents"
            ],
            "writable": true,
            "signer": true
          },
          {
            "name": "tokenProgram",
            "docs": [
              "Solana ecosystem accounts"
            ],
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "name": "associatedTokenProgram",
            "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "amountA",
            "type": "u64"
          },
          {
            "name": "amountB",
            "type": "u64"
          }
        ]
      },
      {
        "name": "initializePool",
        "discriminator": [
          95,
          180,
          10,
          172,
          84,
          174,
          232,
          40
        ],
        "accounts": [
          {
            "name": "pool",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "arg",
                  "path": "id"
                },
                {
                  "kind": "account",
                  "path": "mintA"
                },
                {
                  "kind": "account",
                  "path": "mintB"
                }
              ]
            }
          },
          {
            "name": "poolAuthority",
            "pda": {
              "seeds": [
                {
                  "kind": "arg",
                  "path": "id"
                },
                {
                  "kind": "account",
                  "path": "mintA"
                },
                {
                  "kind": "account",
                  "path": "mintB"
                },
                {
                  "kind": "const",
                  "value": [
                    97,
                    117,
                    116,
                    104,
                    111,
                    114,
                    105,
                    116,
                    121
                  ]
                }
              ]
            }
          },
          {
            "name": "mintLiquidity",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "arg",
                  "path": "id"
                },
                {
                  "kind": "account",
                  "path": "mintA"
                },
                {
                  "kind": "account",
                  "path": "mintB"
                },
                {
                  "kind": "const",
                  "value": [
                    108,
                    105,
                    113,
                    117,
                    105,
                    100,
                    105,
                    116,
                    121
                  ]
                }
              ]
            }
          },
          {
            "name": "mintA"
          },
          {
            "name": "mintB"
          },
          {
            "name": "payer",
            "docs": [
              "The account paying for all rents"
            ],
            "writable": true,
            "signer": true
          },
          {
            "name": "tokenProgram",
            "docs": [
              "Solana ecosystem accounts"
            ],
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "name": "associatedTokenProgram",
            "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "id",
            "type": "pubkey"
          }
        ]
      },
      {
        "name": "initializePoolAccounts",
        "discriminator": [
          168,
          30,
          201,
          19,
          247,
          28,
          160,
          210
        ],
        "accounts": [
          {
            "name": "pool",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "pool.id",
                  "account": "pool"
                },
                {
                  "kind": "account",
                  "path": "mintA"
                },
                {
                  "kind": "account",
                  "path": "mintB"
                }
              ]
            }
          },
          {
            "name": "poolAuthority",
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "pool.id",
                  "account": "pool"
                },
                {
                  "kind": "account",
                  "path": "mintA"
                },
                {
                  "kind": "account",
                  "path": "mintB"
                },
                {
                  "kind": "const",
                  "value": [
                    97,
                    117,
                    116,
                    104,
                    111,
                    114,
                    105,
                    116,
                    121
                  ]
                }
              ]
            }
          },
          {
            "name": "mintLiquidity",
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "pool.id",
                  "account": "pool"
                },
                {
                  "kind": "account",
                  "path": "mintA"
                },
                {
                  "kind": "account",
                  "path": "mintB"
                },
                {
                  "kind": "const",
                  "value": [
                    108,
                    105,
                    113,
                    117,
                    105,
                    100,
                    105,
                    116,
                    121
                  ]
                }
              ]
            }
          },
          {
            "name": "mintA"
          },
          {
            "name": "mintB"
          },
          {
            "name": "poolAccountA",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "poolAuthority"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mintA"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "poolAccountB",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "poolAuthority"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mintB"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "payer",
            "docs": [
              "The account paying for all rents"
            ],
            "writable": true,
            "signer": true
          },
          {
            "name": "tokenProgram",
            "docs": [
              "Solana ecosystem accounts"
            ],
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "name": "associatedTokenProgram",
            "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": []
      },
      {
        "name": "swap",
        "discriminator": [
          248,
          198,
          158,
          145,
          225,
          117,
          135,
          200
        ],
        "accounts": [
          {
            "name": "pool",
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "pool.id",
                  "account": "pool"
                },
                {
                  "kind": "account",
                  "path": "pool.mint_a",
                  "account": "pool"
                },
                {
                  "kind": "account",
                  "path": "pool.mint_b",
                  "account": "pool"
                }
              ]
            }
          },
          {
            "name": "poolAuthority",
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "pool.id",
                  "account": "pool"
                },
                {
                  "kind": "account",
                  "path": "mintA"
                },
                {
                  "kind": "account",
                  "path": "mintB"
                },
                {
                  "kind": "const",
                  "value": [
                    97,
                    117,
                    116,
                    104,
                    111,
                    114,
                    105,
                    116,
                    121
                  ]
                }
              ]
            }
          },
          {
            "name": "trader",
            "docs": [
              "The account doing the swap"
            ],
            "signer": true
          },
          {
            "name": "mintA",
            "relations": [
              "pool"
            ]
          },
          {
            "name": "mintB",
            "relations": [
              "pool"
            ]
          },
          {
            "name": "poolAccountA",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "poolAuthority"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mintA"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "poolAccountB",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "poolAuthority"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mintB"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "traderAccountA",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "trader"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mintA"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "traderAccountB",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "trader"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mintB"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "payer",
            "docs": [
              "The account paying for all rents"
            ],
            "writable": true,
            "signer": true
          },
          {
            "name": "tokenProgram",
            "docs": [
              "Solana ecosystem accounts"
            ],
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "name": "associatedTokenProgram",
            "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "swapA",
            "type": "bool"
          },
          {
            "name": "inputAmount",
            "type": "u64"
          },
          {
            "name": "minOutputAmount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "withdraw",
        "discriminator": [
          183,
          18,
          70,
          156,
          148,
          109,
          161,
          34
        ],
        "accounts": [
          {
            "name": "pool",
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "pool.id",
                  "account": "pool"
                },
                {
                  "kind": "account",
                  "path": "pool.mint_a",
                  "account": "pool"
                },
                {
                  "kind": "account",
                  "path": "pool.mint_b",
                  "account": "pool"
                }
              ]
            }
          },
          {
            "name": "poolAuthority",
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "pool.id",
                  "account": "pool"
                },
                {
                  "kind": "account",
                  "path": "mintA"
                },
                {
                  "kind": "account",
                  "path": "mintB"
                },
                {
                  "kind": "const",
                  "value": [
                    97,
                    117,
                    116,
                    104,
                    111,
                    114,
                    105,
                    116,
                    121
                  ]
                }
              ]
            }
          },
          {
            "name": "depositor",
            "docs": [
              "The account paying for all rents"
            ],
            "signer": true
          },
          {
            "name": "mintLiquidity",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "pool.id",
                  "account": "pool"
                },
                {
                  "kind": "account",
                  "path": "mintA"
                },
                {
                  "kind": "account",
                  "path": "mintB"
                },
                {
                  "kind": "const",
                  "value": [
                    108,
                    105,
                    113,
                    117,
                    105,
                    100,
                    105,
                    116,
                    121
                  ]
                }
              ]
            }
          },
          {
            "name": "mintA",
            "writable": true,
            "relations": [
              "pool"
            ]
          },
          {
            "name": "mintB",
            "writable": true,
            "relations": [
              "pool"
            ]
          },
          {
            "name": "poolAccountA",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "poolAuthority"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mintA"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "poolAccountB",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "poolAuthority"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mintB"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "depositorAccountLiquidity",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "depositor"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mintLiquidity"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "depositorAccountA",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "depositor"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mintA"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "depositorAccountB",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "depositor"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mintB"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "payer",
            "docs": [
              "The account paying for all rents"
            ],
            "writable": true,
            "signer": true
          },
          {
            "name": "tokenProgram",
            "docs": [
              "Solana ecosystem accounts"
            ],
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "name": "associatedTokenProgram",
            "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "pool",
        "discriminator": [
          241,
          154,
          109,
          4,
          17,
          177,
          109,
          188
        ]
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "invalidFee",
        "msg": "Invalid fee value"
      },
      {
        "code": 6001,
        "name": "invalidMint",
        "msg": "Invalid mint for the pool"
      },
      {
        "code": 6002,
        "name": "depositTooSmall",
        "msg": "Depositing too little liquidity"
      },
      {
        "code": 6003,
        "name": "outputTooSmall",
        "msg": "Output is below the minimum expected"
      },
      {
        "code": 6004,
        "name": "invariantViolated",
        "msg": "Invariant does not hold"
      },
      {
        "code": 6005,
        "name": "poolNotInitialized",
        "msg": "Pool account has not been initialized"
      },
      {
        "code": 6006,
        "name": "insufficientBalance",
        "msg": "Balance not enough"
      }
    ],
    "types": [
      {
        "name": "pool",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "id",
              "type": "pubkey"
            },
            {
              "name": "accountInitialized",
              "type": "bool"
            },
            {
              "name": "mintA",
              "docs": [
                "Mint of token A"
              ],
              "type": "pubkey"
            },
            {
              "name": "mintB",
              "docs": [
                "Mint of token B"
              ],
              "type": "pubkey"
            }
          ]
        }
      }
    ],
    "constants": [
      {
        "name": "ammFee",
        "type": "u16",
        "value": "100"
      },
      {
        "name": "authoritySeed",
        "type": "bytes",
        "value": "[97, 117, 116, 104, 111, 114, 105, 116, 121]"
      },
      {
        "name": "liquiditySeed",
        "type": "bytes",
        "value": "[108, 105, 113, 117, 105, 100, 105, 116, 121]"
      },
      {
        "name": "minimumLiquidity",
        "type": "u64",
        "value": "100"
      }
    ]
  };
  