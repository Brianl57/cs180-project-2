"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Menu, X } from "lucide-react"

export default function CS180ProjectPage() {
  const [activeSection, setActiveSection] = useState("introduction")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const sections = [
    { id: "introduction", title: "Introduction", level: 0 },
    { id: "part1", title: "Part 1: Fun with Filters", level: 0 },
    { id: "part1-1", title: "1.1: Convolutions from Scratch!", level: 1 },
    { id: "part1-2", title: "1.2: Finite Difference Operator", level: 1 },
    { id: "part1-3", title: "1.3: Derivative of Gaussian (DoG) Filter", level: 1 },
    { id: "part2", title: "Part 2: Fun with Frequencies!", level: 0 },
    { id: "part2-1", title: '2.1: Image "Sharpening"', level: 1 },
    { id: "part2-2", title: "2.2: Hybrid Images", level: 1 },
    { id: "part2-3", title: "2.3: Gaussian and Laplacian Stacks & Multiresolution Blending", level: 1 },
    { id: "problems", title: "Problems Encountered", level: 0 },
    { id: "takeaways", title: "Key Takeaways", level: 0 },
  ]

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-card border-r border-border z-40 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-foreground">CS180 Project 2</h1>
            <p className="text-sm text-muted-foreground mt-1">Fun with Filters and Frequencies!</p>
          </div>

          <ScrollArea className="h-[calc(100vh-200px)]">
            <nav className="space-y-1">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "secondary" : "ghost"}
                  className={`w-full justify-start text-left h-auto py-2 px-3 ${
                    section.level === 1 ? "ml-4 text-sm" : ""
                  }`}
                  onClick={() => scrollToSection(section.id)}
                >
                  {section.level === 1 && <ChevronRight className="h-3 w-3 mr-1" />}
                  {section.title}
                </Button>
              ))}
            </nav>
          </ScrollArea>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-80 min-h-screen">
        <div className="max-w-4xl mx-auto p-6 lg:p-8">
          {/* Header */}
          <div className="mb-12 pt-16 lg:pt-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              CS180 Project 2: Fun with Filters and Frequencies!
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span>Author: Brian Le</span>
              <Separator orientation="vertical" className="h-4" />
              <span>Published: September 27, 2025</span>
            </div>
          </div>

          {/* Introduction */}
          <section id="introduction" className="mb-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2 pb-2 border-b border-border">Introduction</h2>
              <div className="prose prose-gray max-w-none mt-6">
                <p className="text-lg leading-relaxed">
                  This project explores fundamental techniques in image processing through two main themes: filters and frequencies. In the first part, I worked with convolution operations, finite difference filters, Gaussian smoothing, and derivative-of-Gaussian filters to build an understanding of how edges and gradients can be extracted from images. In the second part, I applied frequency-based methods to create sharpened images, hybrid images that change interpretation with distance, and multi-resolution blends that combine different images seamlessly. Across both parts, I present the methods used, the visual results, and key insights gained - demonstrating how these techniques not only produce striking visual effects but also address core challenges in computer vision and computational photography.
                </p>
              </div>
            </div>
          </section>

          {/* Part 1: Fun with Filters */}
          <section id="part1" className="mb-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2 pb-2 border-b border-border">
                Part 1: Fun with Filters
              </h2>
              <p className="text-muted-foreground mt-4">
                Building intuitions about 2D convolutions and filtering through hands-on implementation
              </p>
            </div>
          </section>

          {/* Part 1.1: Convolutions from Scratch */}
          <section id="part1-1" className="mb-12">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2 pb-2 border-b border-border">
                Part 1.1: Convolutions from Scratch!
              </h3>
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3">Overview</h4>
                  <p className="text-muted-foreground mb-4">
                    Implementation of 2D convolution from scratch using numpy, comparing performance with built-in
                    functions and exploring different filtering operations on the following test image.
                  </p>
                  
                  <div className="flex justify-center">
                    <div className="text-center">
                      <img
                        src="17_Brian_Eiffel_Tower_-_Original.jpg"
                        alt="Brian Eiffel Tower - Original"
                        className="w-64 h-80 object-cover mb-2"
                      />
                      <p className="text-sm text-muted-foreground">Brian Eiffel Tower - Original</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Methodology</h4>
                  <p className="mb-4">
                    I implemented convolution using both four-loop and optimized two-loop approaches, with proper
                    zero-padding to handle boundary conditions.
                  </p>

                  <div className="bg-muted p-4 rounded-lg">
                    <h5 className="font-mono text-sm font-semibold mb-2">Convolution Implementation</h5>
                    <pre className="text-sm font-mono overflow-x-auto">
                      {`# Helper functions
def pad_img(img, p_h, p_w):
    return np.pad(img, ((p_h, p_h), (p_w, p_w)), mode='constant', constant_values=0)

def flip_kernel(kernel):
    return np.flipud(np.fliplr(kernel))

# convolve with 4 for-loops
def convolve_naive4(img, kernel):
    
    kernel = flip_kernel(kernel)
    kernel_h, kernel_w = kernel.shape

    pad_h = kernel_h // 2
    pad_w = kernel_w // 2

    padded_img = pad_img(img, pad_h, pad_w)

    output_img = np.zeros_like(img, dtype=float)
    
    H, W = img.shape

    for i in range(H):
        for j in range(W):
            val_ij = 0.0
            for m in range(kernel_h):
                for n in range(kernel_w):
                    val_ij += padded_img[i + m, j + n] * kernel[m, n]
            output_img[i, j] = val_ij


    return output_img

# convolve with 2 for-loops
def convolve_naive2(img, kernel):
    
    kernel = flip_kernel(kernel)
    kernel_h, kernel_w = kernel.shape

    pad_h = kernel_h // 2
    pad_w = kernel_w // 2

    padded_img = pad_img(img, pad_h, pad_w)

    output_img = np.zeros_like(img, dtype=float)
    
    H, W = img.shape

    for i in range(H):
        for j in range(W):
            convolve_region = padded_img[i:i+kernel_h, j:j+kernel_w]
            val_ij = np.sum(convolve_region * kernel)
            output_img[i, j] = val_ij


    return output_img`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Results</h4>
                  
                  {/* Comparison Grid */}
                  <div className="mb-6">
                    <h5 className="font-semibold mb-3">Performance Comparison: SciPy vs Naive Implementation</h5>
                    <div className="grid grid-cols-4 gap-4">
                      {/* Headers */}
                      <div className="text-center font-semibold text-sm text-muted-foreground">
                        SciPy convolve2d
                      </div>
                      <div className="text-center font-semibold text-sm text-muted-foreground">
                        Naive Implementation
                      </div>
                      <div className="text-center font-semibold text-sm text-muted-foreground">
                        SciPy Time
                      </div>
                      <div className="text-center font-semibold text-sm text-muted-foreground">
                        Naive Time
                      </div>

                      {/* Box Filter Row */}
                      <div className="text-center">
                        <img
                          src="01_Box_Filter_-_SciPy_convolve2d.jpg"
                          alt="Box Filter - SciPy convolve2d"
                          className="w-64 h-80 object-cover mb-2"
                        />
                        <p className="text-xs text-muted-foreground">Box Filter - SciPy</p>
                      </div>
                      <div className="text-center">
                        <img
                          src="02_Box_Filter_-_naive2.jpg"
                          alt="Box Filter - naive2"
                          className="w-64 h-80 object-cover mb-2"
                        />
                        <p className="text-xs text-muted-foreground">Box Filter - naive2</p>
                      </div>
                      <div className="text-center flex items-center justify-center">
                        <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-mono">
                          0.205s
                        </div>
                      </div>
                      <div className="text-center flex items-center justify-center">
                        <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-mono">
                          4.186s
                        </div>
                      </div>

                      {/* Dx Filter Row */}
                      <div className="text-center">
                        <img
                          src="03_Dx_Filter_-_SciPy_convolve2d.jpg"
                          alt="Dx Filter - SciPy convolve2d"
                          className="w-64 h-80 object-cover mb-2"
                        />
                        <p className="text-xs text-muted-foreground">Dx Filter - SciPy</p>
                      </div>
                      <div className="text-center">
                        <img
                          src="04_Dx_Filter_-_naive2.jpg"
                          alt="Dx Filter - naive2"
                          className="w-64 h-80 object-cover mb-2"
                        />
                        <p className="text-xs text-muted-foreground">Dx Filter - naive2</p>
                      </div>
                      <div className="text-center flex items-center justify-center">
                        <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-mono">
                          0.021s
                        </div>
                      </div>
                      <div className="text-center flex items-center justify-center">
                        <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-mono">
                          3.986s
                        </div>
                      </div>

                      {/* Dy Filter Row */}
                      <div className="text-center">
                        <img
                          src="05_Dy_Filter_-_SciPy_convolve2d.jpg"
                          alt="Dy Filter - SciPy convolve2d"
                          className="w-64 h-80 object-cover mb-2"
                        />
                        <p className="text-xs text-muted-foreground">Dy Filter - SciPy</p>
                      </div>
                      <div className="text-center">
                        <img
                          src="06_Dy_Filter_-_naive2.jpg"
                          alt="Dy Filter - naive2"
                          className="w-64 h-80 object-cover mb-2"
                        />
                        <p className="text-xs text-muted-foreground">Dy Filter - naive2</p>
                      </div>
                      <div className="text-center flex items-center justify-center">
                        <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-mono">
                          0.026s
                        </div>
                      </div>
                      <div className="text-center flex items-center justify-center">
                        <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-mono">
                          4.003s
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p>
                      The results demonstrate that SciPy's optimized convolution implementation is significantly faster 
                      (~20x speedup) compared to our naive Python implementation, while producing identical results. 
                      The performance difference becomes more pronounced with larger images and kernels.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Part 1.2: Finite Difference Operator */}
          <section id="part1-2" className="mb-12">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2 pb-2 border-b border-border">
                Part 1.2: Finite Difference Operator
              </h3>
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3">Overview</h4>
                  <p className="text-muted-foreground mb-4">
                    Computing partial derivatives and gradient magnitude for edge detection using finite difference
                    operators. We will experiment on the classic Cameraman image to demonstrate the effects of Dx and Dy filters, 
                    gradient magnitude computation, and edge binarization.
                  </p>
                  
                  <div className="flex justify-center mb-6">
                    <div className="text-center">
                      <img
                        src="07_Cameraman_-_Original.jpg"
                        alt="Cameraman - Original"
                        className="w-64 h-64 object-cover mb-2"
                      />
                      <p className="text-sm text-muted-foreground">Cameraman - Original</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Methodology</h4>
                  <p className="mb-4">
                    To compute image gradients, I first convolved the cameraman image with finite difference filters in the horizontal and vertical directions. Specifically, I used D<sub>x</sub> = [1, -1] to approximate changes along the x-axis and D<sub>y</sub> = [[1], [-1]] to capture changes along the y-axis. These operations produced the partial derivative images that highlight horizontal and vertical intensity changes, respectively.
                  </p>
                  <p className="mb-4">
                    Next, I combined these results to compute the gradient magnitude image using the Euclidean norm, which emphasizes areas of strong intensity change and reveals the edges present in the scene. To further refine the edge map, I applied Gaussian smoothing prior to thresholding. A two-dimensional Gaussian filter of size 15×15 with σ = 1 was used to suppress noise and produce cleaner gradients. Finally, I binarized the gradient magnitude image using a threshold value of 0.22. This value provided the best balance between preserving meaningful edges and suppressing noise, resulting in a clear and accurate edge detection of the cameraman image.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Results</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center">
                      <img
                        src="08_Dx_filter_-_Cameraman.jpg"
                        alt="Dx filter - Cameraman"
                        className="w-full h-48 object-cover mb-2"
                      />
                      <p className="text-sm text-muted-foreground">Dx filter - Cameraman</p>
                    </div>
                    <div className="text-center">
                      <img
                        src="09_Dy_filter_-_Cameraman.jpg"
                        alt="Dy filter - Cameraman"
                        className="w-full h-48 object-cover mb-2"
                      />
                      <p className="text-sm text-muted-foreground">Dy filter - Cameraman</p>
                    </div>
                    <div className="text-center">
                      <img
                        src="10_Cameraman_-_gradient.jpg"
                        alt="Cameraman - gradient"
                        className="w-full h-48 object-cover mb-2"
                      />
                      <p className="text-sm text-muted-foreground">Cameraman - gradient</p>
                    </div>
                    <div className="text-center">
                      <img
                        src="11_Cameraman_-_binarized.jpg"
                        alt="Cameraman - binarized"
                        className="w-full h-48 object-cover mb-2"
                      />
                      <p className="text-sm text-muted-foreground">Cameraman - binarized</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Part 1.3: Derivative of Gaussian Filter */}
          <section id="part1-3" className="mb-12">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2 pb-2 border-b border-border">
                Part 1.3: Derivative of Gaussian (DoG) Filter
              </h3>
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3">Overview</h4>
                  <p className="text-muted-foreground">
                    Combining Gaussian smoothing with derivative operators to reduce noise in edge detection.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Methodology</h4>
                  <p className="mb-4">
                    Building on the previous section, I addressed the noise produced by simple finite difference operators by introducing Gaussian smoothing. I first constructed a two-dimensional Gaussian filter by generating a one-dimensional kernel with <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">cv2.getGaussianKernel()</code> and forming its outer product with its transpose. Convolving the original image with this Gaussian filter produced a smoothed version that reduced high-frequency noise, making subsequent edge detection more stable.
                  </p>
                  <p className="mb-4">
                    Following this, I repeated the derivative procedure from Part 1.2 by applying the finite difference operators to the smoothed image, which produced cleaner gradient and edge maps compared to the raw finite difference approach. To streamline this process, I also constructed Derivative of Gaussian (DoG) filters by directly convolving the Gaussian kernel with D<sub>x</sub> and D<sub>y</sub>. These DoG filters allow the smoothing and derivative operations to be combined into a single convolution step. Applying the DoG filters to the cameraman image produced results consistent with the two-step method, but in a more efficient manner.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Results</h4>
                  <div className="space-y-6">
                    <div>
                      <h5 className="font-semibold mb-3 text-center">DoG Filter Visualization</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center lg:col-start-2">
                          <img
                            src="14_dIdx_(DoG_-_CameraMan).jpg"
                            alt="dI/dx (DoG - CameraMan)"
                            className="w-full h-48 object-cover mb-2"
                          />
                          <p className="text-sm text-muted-foreground">DoG Filter (∂/∂x)</p>
                        </div>
                        <div className="text-center">
                          <img
                            src="15_dIdy_(DoG_-_CameraMan).jpg"
                            alt="dI/dy (DoG - CameraMan)"
                            className="w-full h-48 object-cover mb-2"
                          />
                          <p className="text-sm text-muted-foreground">DoG Filter (∂/∂y)</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-3 text-center">Comparison: Finite Difference vs DoG</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center lg:col-start-2">
                          <img
                            src="11_Cameraman_-_binarized.jpg"
                            alt="Cameraman - binarized"
                            className="w-full h-48 object-cover mb-2"
                          />
                          <p className="text-sm text-muted-foreground">Finite Difference (Noisy)</p>
                        </div>
                        <div className="text-center">
                          <img
                            src="16_DoG_Gradient_(binarized).jpg"
                            alt="DoG Gradient (binarized)"
                            className="w-full h-48 object-cover mb-2"
                          />
                          <p className="text-sm text-muted-foreground">DoG (Smooth)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground mt-6">
                    <p>
                      As shown in the results, the finite difference method produces an edge map that contains noticeable noise, especially in smooth background regions. In contrast, the Derivative of Gaussian (DoG) filter suppresses much of this noise due to the built-in smoothing, while still preserving the prominent edges of the subject. This leads to a cleaner and more visually coherent edge map, demonstrating the advantage of combining smoothing and differentiation into a single operation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Part 2: Fun with Frequencies */}
          <section id="part2" className="mb-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2 pb-2 border-b border-border">
                Part 2: Fun with Frequencies!
              </h2>
              <p className="text-muted-foreground mt-4">
                Exploring frequency domain techniques for image enhancement and creative effects
              </p>
            </div>
          </section>

          {/* Part 2.1: Image Sharpening */}
          <section id="part2-1" className="mb-12">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2 pb-2 border-b border-border">
                Part 2.1: Image "Sharpening"
              </h3>
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3">Overview</h4>
                  <p className="text-muted-foreground">
                    Implementing unsharp masking technique to enhance image sharpness by amplifying high-frequency
                    details.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Methodology</h4>
                  <p className="mb-4">
                    To enhance image sharpness, I implemented the unsharp masking technique, which leverages both low- and high-frequency components of an image. The process begins by applying a Gaussian blur to the original image, which suppresses high-frequency details and preserves only the smooth, low-frequency content. Subtracting this blurred version from the original image isolates the high-frequency information, which corresponds to fine details and edges.
                  </p>
                  <p className="mb-4">
                    The sharpened image is then obtained by adding a scaled version of this high-frequency component back to the original image. The scaling factor, commonly referred to as α, controls the degree of sharpening: larger values emphasize edges more strongly, while smaller values yield subtler results. This formulation can also be expressed as a single convolution filter, known as the unsharp mask filter, which directly boosts high-frequency contributions during convolution.
                  </p>
                  <p className="mb-4">
                    For evaluation, I applied this method to both the Taj Mahal and Eiffel Tower images. In both cases, I used α = 10.0, which produced a visibly sharper result by enhancing fine architectural details without overwhelming the overall structure of the images. These experiments illustrate how unsharp masking can effectively restore or amplify clarity in photographs by selectively reinforcing high-frequency features.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Results</h4>
                  <div className="space-y-8">
                    <div>
                      <h5 className="font-semibold mb-3 text-center">Taj Mahal Sharpened</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center">
                          <img
                            src="19_Taj_-_Original.jpg"
                            alt="Taj - Original"
                            className="w-full h-48 object-cover mb-2"
                          />
                          <p className="text-sm text-muted-foreground">Taj - Original</p>
                        </div>
                        <div className="text-center">
                          <img
                            src="20_Taj_-_Blurred.jpg"
                            alt="Taj - Blurred"
                            className="w-full h-48 object-cover mb-2"
                          />
                          <p className="text-sm text-muted-foreground">Taj - Blurred</p>
                        </div>
                        <div className="text-center">
                          <img
                            src="21_Taj_-_High_Frequency_Magnitude.jpg"
                            alt="Taj - High Frequency Magnitude"
                            className="w-full h-48 object-cover mb-2"
                          />
                          <p className="text-sm text-muted-foreground">Taj - High Frequency Magnitude</p>
                        </div>
                        <div className="text-center">
                          <img
                            src="22_Taj_-_Sharped_(α10.0).jpg"
                            alt="Taj - Sharped (α=10.0)"
                            className="w-full h-48 object-cover mb-2"
                          />
                          <p className="text-sm text-muted-foreground">Taj - Sharped (α=10.0)</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-3 text-center">Brian Eiffel Tower Sharpened</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center lg:col-start-2">
                          <img
                            src="17_Brian_Eiffel_Tower_-_Original.jpg"
                            alt="Brian Eiffel Tower - Original"
                            className="w-64 h-80 object-cover mb-2"
                          />
                          <p className="text-sm text-muted-foreground">Brian Eiffel Tower - Original</p>
                        </div>
                        <div className="text-center">
                          <img
                            src="18_Brian_Eiffel_Tower_-_Sharpened.jpg"
                            alt="Brian Eiffel Tower - Sharpened"
                            className="w-64 h-80 object-cover mb-2"
                          />
                          <p className="text-sm text-muted-foreground">Brian Eiffel Tower - Sharpened</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Part 2.2: Hybrid Images */}
          <section id="part2-2" className="mb-12">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2 pb-2 border-b border-border">
                Part 2.2: Hybrid Images
              </h3>
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3">Overview</h4>
                  <p className="text-muted-foreground mb-4">
                    Creating hybrid images that change interpretation based on viewing distance by combining low
                    frequencies from one image with high frequencies from another. We will demonstrate this technique
                    using the classic Derek and Nutmeg example.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <img
                        src="23_Derek_(Low)_-_Original.jpg"
                        alt="Derek (Low) - Original"
                        className="w-64 h-80 object-cover mb-2 mx-auto"
                      />
                      <p className="text-sm text-muted-foreground">Derek (Low) - Original</p>
                    </div>
                    <div className="text-center">
                      <img
                        src="24_Nutmeg_(High)_-_Original.jpg"
                        alt="Nutmeg (High) - Original"
                        className="w-64 h-80 object-cover mb-2 mx-auto"
                      />
                      <p className="text-sm text-muted-foreground">Nutmeg (High) - Original</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Methodology</h4>
                  <p className="mb-4">
                    The objective of this section was to create hybrid images that change in interpretation depending on viewing distance, following the approach described by Oliva, Torralba, and Schyns (2006). The core idea is that human perception is dominated by high-frequency details when viewed up close, but at a distance, only low-frequency structure remains noticeable. By combining the low-frequency content of one image with the high-frequency content of another, it is possible to construct a single image that shifts in interpretation depending on scale and distance.
                  </p>
                  <p className="mb-4">
                    To achieve this, I first applied a low-pass filter to one image using a Gaussian kernel. This removed sharp details and preserved only the smooth intensity variations. The second image was processed with a high-pass filter, obtained by subtracting a Gaussian-blurred version of the image from the original. This emphasized the fine edges and details. Both filtered images were then combined through a weighted sum, where scaling factors (gains) were applied to balance the contributions of the low- and high-frequency components.
                  </p>
                  <p className="mb-4">
                    For my implementation, I used the following parameters:
                  </p>
                  <ul className="list-disc list-inside mb-4 ml-4 space-y-1">
                    <li>Low-pass filter: kernel size = 85, σ = 12.0, gain = 0.8</li>
                    <li>High-pass filter: kernel size = 25, σ = 3.5, gain = 1.7</li>
                  </ul>
                  <p className="mb-4">
                    These values were chosen through experimentation, as the kernel size and standard deviation control the cutoff frequency of the filters, while the gain terms adjust the relative prominence of each component. Larger kernel sizes and higher σ values in the low-pass filter suppressed more details, while smaller values in the high-pass filter retained fine edges without overwhelming the hybrid. The gain parameters were particularly important for achieving a perceptually balanced result where neither image dominated too strongly.
                  </p>
                  <p className="mb-4">
                    Finally, I created three hybrid images: one using the provided Derek + Nutmeg pair (as a baseline) and two using my own image pairs. For the Derek + Nutmeg hybrid, I also illustrated the process by visualizing the Fourier transforms of the input images, their filtered components, and the final hybrid result. This frequency-domain analysis confirmed that the low-pass and high-pass filtering successfully isolated distinct bands of information, which were then combined to form the hybrid images.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Results</h4>
                  <div className="space-y-8">
                    <div>
                      <h5 className="font-semibold mb-3 text-center">Derek + Nutmeg Hybrid Analysis</h5>
                      
                      {/* Aligned Sources */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="text-center">
                          <img
                            src="25_Derek_(LP_Source)_-_Aligned.jpg"
                            alt="Derek (LP Source) - Aligned"
                            className="w-64 h-80 object-cover mb-2 mx-auto"
                          />
                          <p className="text-sm text-muted-foreground">Derek (LP Source) - Aligned</p>
                        </div>
                        <div className="text-center">
                          <img
                            src="30_FFT_log_I.jpg"
                            alt="FFT log |I₁|"
                            className="w-64 h-80 object-contain mb-2 mx-auto"
                          />
                          <p className="text-sm text-muted-foreground">FFT log |I₁|</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="text-center">
                          <img
                            src="26_Nutmeg_(HP_Source)_-_Aligned.jpg"
                            alt="Nutmeg (HP Source) - Aligned"
                            className="w-64 h-80 object-cover mb-2 mx-auto"
                          />
                          <p className="text-sm text-muted-foreground">Nutmeg (HP Source) - Aligned</p>
                        </div>
                        <div className="text-center">
                          <img
                            src="31_FFT_log_I.jpg"
                            alt="FFT log |I₂|"
                            className="w-64 h-80 object-contain mb-2 mx-auto"
                          />
                          <p className="text-sm text-muted-foreground">FFT log |I₂|</p>
                        </div>
                      </div>

                      {/* Filtered Images */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="text-center">
                          <img
                            src="27_Low-pass(I).jpg"
                            alt="Low-pass(I₁)"
                            className="w-64 h-80 object-cover mb-2 mx-auto"
                          />
                          <p className="text-sm text-muted-foreground">Low-pass(I₁)</p>
                        </div>
                        <div className="text-center">
                          <img
                            src="32_FFT_log_LP(I).jpg"
                            alt="FFT log |LP(I₁)|"
                            className="w-64 h-80 object-contain mb-2 mx-auto"
                          />
                          <p className="text-sm text-muted-foreground">FFT log |LP(I₁)|</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="text-center">
                          <img
                            src="28_High-pass(I).jpg"
                            alt="High-pass(I₂)"
                            className="w-64 h-80 object-cover mb-2 mx-auto"
                          />
                          <p className="text-sm text-muted-foreground">High-pass(I₂)</p>
                        </div>
                        <div className="text-center">
                          <img
                            src="33_FFT_log_HP(I).jpg"
                            alt="FFT log |HP(I₂)|"
                            className="w-64 h-80 object-contain mb-2 mx-auto"
                          />
                          <p className="text-sm text-muted-foreground">FFT log |HP(I₂)|</p>
                        </div>
                      </div>

                      {/* Final Hybrid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="text-center">
                          <img
                            src="29_Hybrid_Derek_+_Nutmeg.jpg"
                            alt="Hybrid: Derek + Nutmeg"
                            className="w-64 h-80 object-cover mb-2 mx-auto"
                          />
                          <p className="text-sm text-muted-foreground">Hybrid: Derek + Nutmeg</p>
                        </div>
                        <div className="text-center">
                          <img
                            src="34_FFT_log_Hybrid.jpg"
                            alt="FFT log |Hybrid|"
                            className="w-64 h-80 object-contain mb-2 mx-auto"
                          />
                          <p className="text-sm text-muted-foreground">FFT log |Hybrid|</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-3 text-center">Additional Hybrid Images</h5>
                      
                      {/* Brian Selfie + Dog */}
                      <div className="mb-8">
                        <h6 className="font-medium mb-3 text-center">Brian Selfie ↔ Dog</h6>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center">
                            <img
                              src="35_Brian_Selfie.jpg"
                              alt="Brian Selfie"
                              className="w-64 h-80 object-cover mb-2 mx-auto"
                            />
                            <p className="text-sm text-muted-foreground">Brian Selfie</p>
                          </div>
                          <div className="text-center">
                            <img
                              src="36_Dog.jpg"
                              alt="Dog"
                              className="w-64 h-80 object-cover mb-2 mx-auto"
                            />
                            <p className="text-sm text-muted-foreground">Dog</p>
                          </div>
                          <div className="text-center">
                            <img
                              src="37_Hybrid_Brian_Selfie_+_Dog.jpg"
                              alt="Hybrid: Brian Selfie + Dog"
                              className="w-64 h-80 object-cover mb-2 mx-auto"
                            />
                            <p className="text-sm text-muted-foreground">Hybrid: Brian Selfie + Dog</p>
                          </div>
                        </div>
                      </div>

                      {/* Kitten + Puppy */}
                      <div>
                        <h6 className="font-medium mb-3 text-center">Kitten ↔ Puppy</h6>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center">
                            <img
                              src="38_Kitten.jpg"
                              alt="Kitten"
                              className="w-64 h-80 object-cover mb-2 mx-auto"
                            />
                            <p className="text-sm text-muted-foreground">Kitten</p>
                          </div>
                          <div className="text-center">
                            <img
                              src="39_Puppy.jpg"
                              alt="Puppy"
                              className="w-64 h-80 object-cover mb-2 mx-auto"
                            />
                            <p className="text-sm text-muted-foreground">Puppy</p>
                          </div>
                          <div className="text-center">
                            <img
                              src="40_Hybrid_Kitten_+_Puppy.jpg"
                              alt="Hybrid: Kitten + Puppy"
                              className="w-64 h-80 object-cover mb-2 mx-auto"
                            />
                            <p className="text-sm text-muted-foreground">Hybrid: Kitten + Puppy</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Part 2.3: Gaussian and Laplacian Stacks & Multiresolution Blending */}
          <section id="part2-3" className="mb-12">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2 pb-2 border-b border-border">
                Part 2.3/2.4: Gaussian + Laplacian Stacks & Multiresolution Blending
              </h3>
              <div className="mt-6 space-y-8">
                <div>
                  <h4 className="text-lg font-semibold mb-3">Overview</h4>
                  <p className="text-muted-foreground">
                    Building multi-resolution representations using Gaussian and Laplacian stacks (without downsampling)
                    and using them for seamless image blending. This technique operates on different frequency
                    bands separately, creating smooth transitions without visible seams.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Methodology</h4>
                  <p className="mb-4">
                    To prepare for multiresolution blending, I first constructed Gaussian and Laplacian stacks. A Gaussian stack was formed by repeatedly filtering the image with Gaussian kernels of increasing standard deviation, without any downsampling. This produced progressively smoother versions of the original image, each level retaining the same spatial resolution but representing lower-frequency information. From this sequence, I derived the Laplacian stack by subtracting consecutive Gaussian levels. The result was a set of band-pass images, where each level captures details at a specific frequency range. This decomposition is valuable because it allows different frequency bands to be processed separately and later recombined without loss of detail.
                  </p>
                  <p className="mb-4">
                    With these stacks in place, I implemented multiresolution blending, following the framework described by Burt and Adelson (1983). The goal is to join two images with a smooth seam that adapts to the scale of features in the images. Instead of blending in the spatial domain directly—which often produces sharp edges or ghosting—each image is represented by its Laplacian stack, while the blending mask (which defines which regions come from each image) is represented by a Gaussian stack. At each frequency level, the corresponding Laplacian bands from both images are combined using the smoothed mask as weights. Finally, the blended Laplacian stack is collapsed back into a full-resolution image by summing across all levels.
                  </p>
                  <p className="mb-4">
                    This process was first tested on the classic "Oraple" example, blending an apple and an orange with a vertical seam. Compared to a simple cut-and-paste, the multiresolution approach avoided visible boundaries by gradually transitioning between the two images at coarse scales while preserving fine details locally. Beyond the Oraple, I experimented with custom masks, such as the irregular elliptical masks, to blend different image pairs. These irregular masks demonstrate the flexibility of the method: by smoothing the mask across multiple resolutions, even highly complex boundaries can yield natural, seamless transitions.
                  </p>
                </div>


                <div>
                  <h4 className="text-lg font-semibold mb-3">Blending Results</h4>
                  <div className="space-y-8">
                    <div>
                      <h5 className="font-semibold mb-3 text-center">Multiresolution Blending Process for Oraple</h5>
                      <div className="grid grid-cols-3 gap-4">
                        {/* Row 1: Level 0 */}
                        <div className="text-center">
                          <img
                            src="41_Apple_at_level_0.jpg"
                            alt="Apple at level 0"
                            className="w-full h-48 object-contain mb-2"
                          />
                          <p className="text-xs text-muted-foreground">Apple at level 0</p>
                        </div>
                        <div className="text-center">
                          <img
                            src="44_Orange_at_level_0.jpg"
                            alt="Orange at level 0"
                            className="w-full h-48 object-contain mb-2"
                          />
                          <p className="text-xs text-muted-foreground">Orange at level 0</p>
                        </div>
                        <div className="text-center">
                          <img
                            src="47_Sum_at_level_0.jpg"
                            alt="Sum at level 0"
                            className="w-full h-48 object-contain mb-2"
                          />
                          <p className="text-xs text-muted-foreground">Sum at level 0</p>
                        </div>

                        {/* Row 2: Level 2 */}
                        <div className="text-center">
                          <img
                            src="42_Apple_at_level_2.jpg"
                            alt="Apple at level 2"
                            className="w-full h-48 object-contain mb-2"
                          />
                          <p className="text-xs text-muted-foreground">Apple at level 2</p>
                        </div>
                        <div className="text-center">
                          <img
                            src="45_Orange_at_level_2.jpg"
                            alt="Orange at level 2"
                            className="w-full h-48 object-contain mb-2"
                          />
                          <p className="text-xs text-muted-foreground">Orange at level 2</p>
                        </div>
                        <div className="text-center">
                          <img
                            src="48_Sum_at_level_2.jpg"
                            alt="Sum at level 2"
                            className="w-full h-48 object-contain mb-2"
                          />
                          <p className="text-xs text-muted-foreground">Sum at level 2</p>
                        </div>

                        {/* Row 3: Level 4 */}
                        <div className="text-center">
                          <img
                            src="43_Apple_at_level_4.jpg"
                            alt="Apple at level 4"
                            className="w-full h-48 object-contain mb-2"
                          />
                          <p className="text-xs text-muted-foreground">Apple at level 4</p>
                        </div>
                        <div className="text-center">
                          <img
                            src="46_Orange_at_level_4.jpg"
                            alt="Orange at level 4"
                            className="w-full h-48 object-contain mb-2"
                          />
                          <p className="text-xs text-muted-foreground">Orange at level 4</p>
                        </div>
                        <div className="text-center">
                          <img
                            src="49_Sum_at_level_4.jpg"
                            alt="Sum at level 4"
                            className="w-full h-48 object-contain mb-2"
                          />
                          <p className="text-xs text-muted-foreground">Sum at level 4</p>
                        </div>

                        {/* Row 4: Final Results */}
                        <div className="text-center">
                          <img
                            src="50_Apple.jpg"
                            alt="Apple"
                            className="w-full h-48 object-contain mb-2"
                          />
                          <p className="text-xs text-muted-foreground">Apple</p>
                        </div>
                        <div className="text-center">
                          <img
                            src="51_Orange.jpg"
                            alt="Orange"
                            className="w-full h-48 object-contain mb-2"
                          />
                          <p className="text-xs text-muted-foreground">Orange</p>
                        </div>
                        <div className="text-center">
                          <img
                            src="52_Oraple.jpg"
                            alt="Oraple"
                            className="w-full h-48 object-contain mb-2"
                          />
                          <p className="text-xs text-muted-foreground">Oraple</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-3 text-center">Additional Multiresolution Blended Images</h5>
                      
                      {/* Kitten + Puppy */}
                      <div className="mb-8">
                        <h6 className="font-medium mb-3 text-center">Kitten ↔ Puppy Blend</h6>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center">
                            <img
                              src="38_Kitten.jpg"
                              alt="Kitten"
                              className="w-full h-48 object-contain mb-2"
                            />
                            <p className="text-sm text-muted-foreground">Kitten</p>
                          </div>
                          <div className="text-center">
                            <img
                              src="39_Puppy.jpg"
                              alt="Puppy"
                              className="w-full h-48 object-contain mb-2"
                            />
                            <p className="text-sm text-muted-foreground">Puppy</p>
                          </div>
                          <div className="text-center">
                            <img
                              src="53_Kitpup_Kitten_+_Puppy_Blend.jpg"
                              alt="Kitpup: Kitten + Puppy Blend"
                              className="w-full h-48 object-contain mb-2"
                            />
                            <p className="text-sm text-muted-foreground">Kitpup: Kitten + Puppy Blend</p>
                          </div>
                        </div>
                      </div>

                      {/* Labubu + Kitten */}
                      <div>
                        <h6 className="font-medium mb-3 text-center">Labubu ↔ Kitten Blend</h6>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center">
                            <img
                              src="54_Labubu.jpg"
                              alt="Labubu"
                              className="w-full h-48 object-contain mb-2"
                            />
                            <p className="text-sm text-muted-foreground">Labubu</p>
                          </div>
                          <div className="text-center">
                            <img
                              src="38_Kitten.jpg"
                              alt="Kitten"
                              className="w-full h-48 object-contain mb-2"
                            />
                            <p className="text-sm text-muted-foreground">Kitten</p>
                          </div>
                          <div className="text-center">
                            <img
                              src="55_Labukitty_Labubu_+_Kitten_Blend.jpg"
                              alt="Labukitty: Labubu + Kitten Blend"
                              className="w-full h-48 object-contain mb-2"
                            />
                            <p className="text-sm text-muted-foreground">Labukitty: Labubu + Kitten Blend</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Problems Encountered */}
          <section id="problems" className="mb-12">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2 pb-2 border-b border-border">
                Problems Encountered
              </h2>
              <div className="prose prose-gray max-w-none mt-6">
                <p className="mb-6">
                  During this project, I encountered several challenges that required adjustments to my implementation.
                </p>
                
                <ol className="list-decimal list-inside space-y-6 ml-4">
                  <li className="font-semibold">
                    Displaying High-Frequency Images
                    <p className="font-normal mt-2">
                      When visualizing high-frequency images with <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">plt.imshow</code>, the results often appeared black. This occurred because high-frequency signals contain values near zero, with positive and negative deviations canceling across channels. To make them visible, I normalized the pixel values to [0,1] or displayed the per-pixel magnitude (e.g., using the L2 norm). In some cases, shifting the values (e.g., adding 0.5 before scaling) also preserved contrast and revealed details.
                    </p>
                  </li>
                  
                  <li className="font-semibold">
                    Parameter Tuning for Hybrid Images (Part 2.2)
                    <p className="font-normal mt-2">
                      I initially adjusted kernel sizes and Gaussian sigmas randomly, which produced poor hybrids. I later learned that the parameters should reflect the role of each image: the low-pass image requires a large kernel and high σ to preserve smooth structure, while the high-pass image works best with smaller values to keep fine details. Balancing these cutoffs was essential—if the low-pass was too weak or the high-pass too strong, the result contained ghosting or lacked clarity.
                    </p>
                  </li>
                  
                  <li className="font-semibold">
                    Constructing Laplacian Stacks (Part 2.3)
                    <p className="font-normal mt-2">
                      While building Laplacian stacks, I first used different kernel sizes for successive Gaussian levels. This caused dimension mismatches when subtracting one level from another, leading to errors. The fix was to keep a fixed kernel size across all levels while varying only σ. This ensured that each Gaussian level aligned properly, allowing the Laplacian stack to represent frequency bands as intended.
                    </p>
                  </li>
                </ol>
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          <section id="takeaways" className="mb-12">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2 pb-2 border-b border-border">Key Takeaways</h2>
              <div className="prose prose-gray max-w-none mt-6">
                <p className="mb-4">
                  This project deepened my understanding of how core image processing techniques operate and why they are essential in computer vision. Early experiments with convolution highlighted how simple filters, like finite difference operators, can reveal edges by capturing intensity changes. Extending this to the derivative of Gaussian reinforced the importance of smoothing in reducing noise while still preserving meaningful structure.
                </p>
                <p className="mb-4">
                  A central lesson was the role of the frequency domain. Through unsharp masking and hybrid images, I saw how different frequency bands contribute to perception. High frequencies emphasize edges and detail, while low frequencies capture overall structure. Adjusting parameters such as kernel size, sigma, and scaling factors directly controlled which information was retained, teaching me that parameter choices must be guided by the frequencies I want to emphasize, not just trial and error.
                </p>
                <p className="mb-4">
                  I also learned the value of multi-resolution techniques. Constructing Gaussian and Laplacian stacks showed how images can be broken into different frequency bands, and using these for multiresolution blending demonstrated why seams can be hidden only when blending occurs across scales. The classic "Oraple" experiment illustrated how coarse features and fine details must be treated differently to achieve smooth, seamless transitions.
                </p>
                <p>
                  Finally, the project highlighted important practical considerations. Normalization was necessary to properly visualize high-frequency images, consistent kernel sizes were required for Laplacian stacks, and parameter tuning was key to producing effective hybrids. These debugging challenges not only improved my results but also gave me stronger intuition for the tradeoffs between detail preservation, noise suppression, and perceptual clarity.
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center py-8 text-muted-foreground border-t">
            <p>CS180: Intro to Computer Vision and Computational Photography</p>
            <p className="text-sm mt-2">University of California, Berkeley • Fall 2025</p>
          </footer>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
