const session = Deno.args[0];

Deno.writeTextFileSync(".files/session", session);
