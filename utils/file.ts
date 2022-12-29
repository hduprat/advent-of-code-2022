export const getAoCInput = async (
  day: number,
  year = 2022
): Promise<string[]> => {
  try {
    const session = await Deno.readTextFile(".files/session");
    const result = await fetch(
      `https://adventofcode.com/${year}/day/${day}/input`,
      {
        headers: {
          cookie: `session=${session}`,
        },
      }
    );

    if (result.status !== 200) throw new Error(result.statusText);

    const fileContent = await result.text();

    return fileContent ? fileContent.trimEnd().split("\n") : [];
  } catch (error) {
    if (error.code === "ENOENT") {
      console.warn(
        "Please create a .files directory at the root of your project, fetch the session cookie in AoC and run `./connect <session>`."
      );
      Deno.exit(1);
    } else throw error;
  }
};
