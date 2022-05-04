import request from "@/request";

export function getArticles(query, page) {
  return request({
    url: "/articles",
    method: "post",
    data: {
      page: page.pageNumber,
      pageSize: page.pageSize,
      name: page.name,
      sort: page.sort,
      year: query.year,
      month: query.month,
      tagId: query.tagId,
      title: query.title,
      categoryId: query.categoryId
    }
  });
}

export function getHotArtices() {
  return request({
    url: "/articles/hot",
    method: "post"
  });
}

export function getNewArtices() {
  return request({
    url: "/articles/new",
    method: "post"
  });
}

export function viewArticle(id) {
  return request({
    url: `/articles/view/${id}`,
    method: "get"
  });
}

export function getArticlesByCategory(id) {
  return request({
    url: `/articles/category/${id}`,
    method: "post"
  });
}

export function getArticlesByTag(id) {
  return request({
    url: `/articles/tag/${id}`,
    method: "post"
  });
}

export function publishArticle(article, token) {
  return request({
    headers: { Authorization: token },
    url: "/articles/publish",
    method: "post",
    data: article
  });
}
export function getSensitive() {
  return request({
    url: `/articles/sensitive`,
    method: "get"
  });
}

export function listArchives() {
  return request({
    url: "/articles/listArchives",
    method: "post"
  });
}

export function listArchives2() {
  return request({
    url: "/articles/listArchives2",
    method: "post"
  });
}

export function categoryCount() {
  return request({
    url: "/articles/categoryCount",
    method: "post"
  });
}

export function viewCount() {
  return request({
    url: "/articles/viewCount",
    method: "post"
  });
}

export function getArticleById(id) {
  return request({
    url: `/articles/${id}`,
    method: "get"
  });
}

export function getArticleByAuthorId(authorId) {
  return request({
    url: `/articles/author/${authorId}`,
    method: "get"
  });
}

export function getCommentArticle(authorId) {
  return request({
    url: `/articles/comment/${authorId}`,
    method: "get"
  });
}

export function deleteArticle(id) {
  return request({
    url: "/articles/delete",
    method: "post",
    data: {
      id: id
    }
  });
}
