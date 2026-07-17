import httpClient from "../../../../lib/api/httpClient";
import { getIdempotencyHeaders } from "../../../../shared/lib/idempotency";

export function getScientificInterests() {
  return httpClient.get("scientific-interests", {
    showErrorToast: true,
  });
}

export function getScientificInterestCategories() {
  return httpClient.get("scientific-interest-categories", {
    showErrorToast: true,
  });
}

export function addScientificInterestCategory({ title, idempotencyKey }) {
  const formData = new FormData();

  formData.append("title", title.trim());

  return httpClient.post("add/scientific-interests-categories", formData, {
    headers: getIdempotencyHeaders(idempotencyKey),
    showErrorToast: true,
  });
}

export function updateScientificInterestCategory({
  categoryId,
  title,
  idempotencyKey,
}) {
  const formData = new FormData();

  formData.append("title", title.trim());

  return httpClient.post(
    `update/scientific-interests-categories/${categoryId}`,
    formData,
    {
      headers: getIdempotencyHeaders(idempotencyKey),
      showErrorToast: true,
    },
  );
}

export function deleteScientificInterestCategory(categoryId) {
  const normalizedCategoryId =
    typeof categoryId === "object" ? categoryId.categoryId : categoryId;
  const idempotencyKey =
    typeof categoryId === "object" ? categoryId.idempotencyKey : undefined;

  return httpClient.delete(
    `delete/scientific-interests-categories/${normalizedCategoryId}`,
    {
      headers: getIdempotencyHeaders(idempotencyKey),
      showErrorToast: true,
    },
  );
}

export function addScientificInterest({
  interestCategoryId,
  name,
  icon,
  color,
  idempotencyKey,
}) {
  const formData = new FormData();

  formData.append("interest_category_id", String(interestCategoryId));
  formData.append("name", name.trim());
  formData.append("icon", icon);
  formData.append("color", color);

  return httpClient.post("add/scientific-interests", formData, {
    headers: getIdempotencyHeaders(idempotencyKey),
    showErrorToast: true,
  });
}

export function updateScientificInterest({
  interestId,
  interestCategoryId,
  name,
  icon,
  color,
  idempotencyKey,
}) {
  const formData = new FormData();

  formData.append("interest_category_id", String(interestCategoryId));
  formData.append("name", name.trim());
  formData.append("color", color);

  if (icon) {
    formData.append("icon", icon);
  }

  return httpClient.post(
    `update/scientific-interests/${interestId}`,
    formData,
    {
      headers: getIdempotencyHeaders(idempotencyKey),
      showErrorToast: true,
    },
  );
}

export function deleteScientificInterest(interestId) {
  const normalizedInterestId =
    typeof interestId === "object" ? interestId.interestId : interestId;
  const idempotencyKey =
    typeof interestId === "object" ? interestId.idempotencyKey : undefined;

  return httpClient.delete(
    `delete/scientific-interests/${normalizedInterestId}`,
    {
      headers: getIdempotencyHeaders(idempotencyKey),
      showErrorToast: true,
    },
  );
}
