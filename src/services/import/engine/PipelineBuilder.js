import Pipeline from "./Pipeline";
import ReaderStage from "./stages/ReaderStage";
import AnalyzerStage from "./stages/AnalyzerStage";
import ProfileStage from "./stages/ProfileStage";
import MappingStage from "./stages/MappingStage";
import NormalizerStage from "./stages/NormalizerStage";
import ValidationStage from "./stages/ValidationStage";

export function createPipeline() {
    return new Pipeline([
        new ReaderStage(),
        new AnalyzerStage(),
        new ProfileStage(),
        new MappingStage(),
        new NormalizerStage(),
        new ValidationStage()
    ]);
}