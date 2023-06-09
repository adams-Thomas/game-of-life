"use server"

export const runIteration = async (board: number[][]) => {
  try {
    console.log('hello?')
    const res = await fetch("http://localhost:8080/single", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        board
      })
    })

    return res;
  } catch (error) {
    throw error
  }
}