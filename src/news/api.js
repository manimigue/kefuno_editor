export const dataToLog = (data) => {
  return data.map(article => {
    const { title, published_at, tag, id, author } = article;
    const date = published_at.match(/(\d{4}-\d{2}-\d{2})/)[1]
    return {
      title,
      id,
      tag,
      date,
      author: author? author.username : "Unknown",
      url: "news" + String(id) + "_" + date.replace(/-/g,"")
    }
  })
}
