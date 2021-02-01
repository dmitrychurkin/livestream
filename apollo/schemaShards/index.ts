/**
 * This file merges all of the schemas that belong to different parts of the shards
 */
import file from "./file";
import mergeRawSchemas from "../../util/mergeRawSchemas";

export default mergeRawSchemas(file);
