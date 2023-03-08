import {
  TarsusHttpApplication,
  loadController,
  loadGlobalPipe,
  loadServer,
} from "tarsus";


@TarsusHttpApplication
class TestApplication {
  static main(): void {

    loadController([]);
    loadGlobalPipe([]);
    loadServer({
      ms: false,
    });
    
  }
}

TestApplication.main();