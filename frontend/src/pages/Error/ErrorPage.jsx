import { Button } from "@/components/ui/button";
function FallbackComponent({ error, resetErrorBoundary }) {
  return (
    <div className="h-screen w-100 flex justify-center items-center flex-col">
      <div className="px-10 py-5 rounded-xl text-red-600 mb-5 text-center">
        <h2 className="text-2xl">Something went wrong ! </h2>
      <pre style={{ color: "red" }}>{error.message}</pre>
      </div>
      <Button onclick={() => resetErrorBoundary()}>Please Try again</Button>
    </div>
  );
}

export default FallbackComponent;
