export type ProjectStage = "STABLE" | "IN_DEVELOPMENT";

export function normalizeProjectStage(
  stage: ProjectStage | null | undefined,
): ProjectStage {
  return stage === "IN_DEVELOPMENT" ? "IN_DEVELOPMENT" : "STABLE";
}

export function getProjectStageLabel(stage: ProjectStage | null | undefined) {
  return normalizeProjectStage(stage) === "IN_DEVELOPMENT"
    ? "En desarrollo"
    : "Estable";
}

export function getProjectStageDescription(
  stage: ProjectStage | null | undefined,
) {
  return normalizeProjectStage(stage) === "IN_DEVELOPMENT"
    ? "Todavia lo estoy desarrollando y puede cambiar bastante."
    : "La base ya esta bastante cerrada, aunque puede seguir mejorando.";
}

export function getProjectStageBadgeClass(
  stage: ProjectStage | null | undefined,
) {
  return normalizeProjectStage(stage) === "IN_DEVELOPMENT"
    ? "status-badge status-badge-development"
    : "status-badge status-badge-stable";
}
